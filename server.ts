import { Application } from "https://deno.land/x/oak/mod.ts";
import { ConsoleHandler } from "../Users/vmtmac03/Library/Caches/deno/deps/https/deno.land/5dce229b630c64fda4791ee5b0f4345527f132ed7c7610ab7da40f131d71ca0b.ts";

const app = new Application();

// Logger
app.use(async (ctx, next) => {
    await next();
    const rt = ctx.response.headers.get("X-Response-Time");
    console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});

// Timing
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.response.headers.set("X-Response-Time", `${ms}ms`);
});

// Hello World!
app.use((ctx) => {
    ctx.response.body = "Hello World!";
});

await app.listen({ port: 8000 });
