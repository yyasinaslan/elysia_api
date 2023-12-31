import {Controller} from "@core/decorators/controller.decorator";
import {Get, Post} from "@core/decorators/http.decorator";
import {Context} from "elysia";
import {UserLoginModel, UserProfileModel} from "../models/user.model";
import {Static} from "@sinclair/typebox";

@Controller('/auth')
export class AuthController {

    constructor() {
        console.log('Auth controller initialized')
    }

    @Get('user')
    userInfo(c: Context) {
        return c.body;
    }

    @Post('login', UserLoginModel, UserProfileModel)
    login(c: Context) {
        const body = c.body as Static<typeof UserLoginModel>;
        return {
            username: "yasin",
            registeredAt: new Date(),
            email: 'yasin@example.com'
        }
    }
}
