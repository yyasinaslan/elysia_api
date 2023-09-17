import {HANDLERS} from "@core/contants";
import {TSchema} from "@sinclair/typebox";

export enum HttpMethods {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    DELETE = 'delete',

}

export interface HttpHandlerOptions {
    route: string,
    methodName: string,
    methodType: HttpMethods,
    inputModel?: TSchema,
    outputModel?: TSchema
}

export function Get(route: string = '', inputType?: TSchema, outputType?: TSchema) {
    return function (target: object, methodName: string | symbol) {
        registerHandler(target, {
            route,
            methodName: <string>methodName,
            methodType: HttpMethods.GET,
            inputModel: inputType,
            outputModel: outputType
        })
    }
}

export function Post(route: string = '', inputType?: TSchema, outputType?: TSchema) {
    return function (target: object, methodName: string | symbol) {
        registerHandler(target, {
            route,
            methodName: <string>methodName,
            methodType: HttpMethods.POST,
            inputModel: inputType,
            outputModel: outputType
        })
    }
}

export function Put(route: string = '', inputType?: TSchema, outputType?: TSchema) {
    return function (target: object, methodName: string | symbol) {
        registerHandler(target, {
            route,
            methodName: <string>methodName,
            methodType: HttpMethods.PUT,
            inputModel: inputType,
            outputModel: outputType
        })
    }
}

export function Delete(route: string = '', inputType?: TSchema, outputType?: TSchema) {
    return function (target: object, methodName: string | symbol) {
        registerHandler(target, {
            route,
            methodName: <string>methodName,
            methodType: HttpMethods.DELETE,
            inputModel: inputType,
            outputModel: outputType
        })
    }
}


function registerHandler(target: object, handler: HttpHandlerOptions) {
    let handlers = Reflect.get(target, HANDLERS) as undefined | HttpHandlerOptions[];
    if (!handlers) handlers = [];
    handlers.push(handler);
    Reflect.set(target, HANDLERS, handlers);
}
