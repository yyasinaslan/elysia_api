import {Elysia} from "elysia";
import * as fs from "fs";
import * as path from "path";
import {CONTROLLER, CONTROLLER_PREFIX, HANDLERS} from "@core/contants";
import {Constructor} from "@core/types/constructor";

export async function registerControllers(app: Elysia, dir: string) {

    const files = fs.readdirSync(dir)

    for (const fileName of files) {
        const module = await import(path.join(dir, fileName));
        const exports: Constructor[] = Object.values(module);
        for (const e of exports) {
            if (!Reflect.has(e, CONTROLLER)) continue;

            const prefix = Reflect.get(e, CONTROLLER_PREFIX);

            const instance = new e();

            const handlers = Reflect.get(instance, HANDLERS);

            for (const handler of handlers){
                // const route =
            }

        }

    }

}
