import {Elysia} from "elysia";
import swagger from "@elysiajs/swagger";
import {registerControllers} from "@core/registerer";
import * as path from "path";

const app = new Elysia();

app.use(swagger());

const controllersFolder = path.join(import.meta.dir, 'controllers');

await registerControllers(app, controllersFolder)

app.listen(3000);

console.log(
    `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
