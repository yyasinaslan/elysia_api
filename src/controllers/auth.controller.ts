import {Controller} from "@core/decorators/controller.decorator";
import {Get, Post} from "@core/decorators/http.decorator";
import {Context} from "elysia";

@Controller('/auth')
export class AuthController {

    constructor() {
        console.log('Auth controller initialized')
    }

    @Get('user')
    userInfo(c: Context) {
        return c.body;
    }

    @Post('login')
    login(c: Context) {
        return c.body;
    }
}
