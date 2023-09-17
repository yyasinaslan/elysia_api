export function joinRoutes(...args: string[]) {
    args = args.map(route => rightTrim(route, '/'))
    return args.join('/')
}

export function rightTrim(str: string, char: string) {
    return str.replace(new RegExp(char + '+$'), '');
}

export function leftTrim(str: string, char: string) {
    return str.replace(new RegExp('^' + char + '+'), '');
}
