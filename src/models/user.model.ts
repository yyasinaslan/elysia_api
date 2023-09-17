import {t} from "elysia";

export const UserLoginModel = t.Object({
    username: t.String(),
    password: t.String()
})

export const UserProfileModel = t.Object({
    username: t.String(),
    registeredAt: t.Date()
})
