import {Elysia} from "elysia";
import * as fs from "fs";
import * as path from "path";
import {CONTROLLER, CONTROLLER_PREFIX, HANDLERS} from "@core/contants";
import {Constructor} from "@core/types/constructor";
import {joinRoutes} from "@core/helpers/path.helper";
import {HttpHandlerOptions} from "@core/decorators/http.decorator";
import {Value} from "@sinclair/typebox/value";

export async function registerControllers(app: Elysia, dir: string) {

    const files = fs.readdirSync(dir)

    for (const fileName of files) {
        const module = await import(path.join(dir, fileName));
        const exports: Constructor[] = Object.values(module);
        for (const e of exports) {
            if (!Reflect.has(e, CONTROLLER)) continue;

            const prefix = Reflect.get(e, CONTROLLER_PREFIX);

            const instance = new e();

            const handlers = Reflect.get(instance, HANDLERS) as HttpHandlerOptions[];

            for (const handler of handlers) {
                if (!instance[handler.methodName] || typeof instance[handler.methodName] != 'function') continue;

                const route = joinRoutes(prefix, handler.route);

                app[handler.methodType](route, async (c) => {

                    // todo: BeforeHandlerHook

                    const result = await instance[handler.methodName](c);

                    // todo: AfterHandlerHook, serialize response according to output model
                    let casted = result;
                    if (handler.outputModel) {
                        casted = Value.Cast(handler.outputModel, result);
                    }

                    return casted;
                }, {
                    body: handler.inputModel,
                    response: handler.outputModel
                })
            }

        }

    }

}
