import { Application, Router, Status } from "https://deno.land/x/oak/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";
import "https://deno.land/x/dotenv/load.ts";

import logger from "./middleware/logger.ts";
import timer from "./middleware/timer.ts";

import userMiddleware from "./middleware/userMiddleware.ts";

// Import all routing here
import blogs from "./routes/blogs.ts";
import auth from "./routes/auth.ts";

const app = new Application();
const router = new Router();

const port = Number.bind(null, Deno.env.get("PORT"))();
console.log(port);

// Logger
app.use(logger);
// Timing
app.use(timer);

// console.log(config()); all .env variables

// Hello World!
router.get("/", (ctx) => {
  ctx.response.status = Status.OK;
  ctx.response.type = "json";
  ctx.response.body = {
    status: "success",
    message: "Hello Deno!!",
    data: null,
  };
});

app.use(userMiddleware); // userMiddleware

app.use(router.routes())
   .use(blogs.routes())
   .use(auth.routes());

app.use(router.allowedMethods());

app.addEventListener('error', evt => {
  console.log(evt.error);
});

console.log("app running -> http://localhost:" + port);

await app.listen({ port: port });