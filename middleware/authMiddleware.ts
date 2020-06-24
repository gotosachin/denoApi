import { Context } from "https://deno.land/x/oak/mod.ts";
import { validateJwt } from "https://deno.land/x/djwt/validate.ts";

const authMiddleware = async (ctx: Context, next: any) => {
  console.log("Middleware");
  const headers: Headers = ctx.request.headers;
  const authorization = headers.get("Authorization");

  if (!authorization) {
    ctx.response.status = 401;
    return;
  }

  const jwt = authorization.split(" ")[1];

  if (!jwt) {
    ctx.response.status = 401;
    return;
  }

  // const key = String.bind(null, Deno.env.get("JWT_KEY"))();

  if (await validateJwt(jwt, Deno.env.get('JWT_KEY') || '', { isThrowing: false })) {
    await next();
    return;
  }
  
  ctx.response.status = 401;
  ctx.response.body = { message: "Unauthenticate Access!!" };
};

export default authMiddleware;
