import {CONTROLLER, CONTROLLER_PREFIX} from "../contants";

export function Controller(prefix: string = '') {
    return function (target: object) {
        Reflect.set(target, CONTROLLER, true);
        Reflect.set(target, CONTROLLER_PREFIX, prefix);
    }
}
