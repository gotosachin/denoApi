import { Status, Context, Request } from "https://deno.land/x/oak/mod.ts";
// import "https://deno.land/x/dotenv/load.ts";

import {
  makeJwt,
  setExpiration,
  Jose,
  Payload,
} from "https://deno.land/x/djwt/create.ts";

import dbclient from "../db/mysql.ts";

// const key = Deno.env.get("JWT_KEY") || '';

const header: Jose = {
  alg: "HS256",
  typ: "JWT",
};

/**
 *
 * @param ctx
 */
export async function index(ctx: any) {
  const users: any = (await dbclient.execute("SELECT * FROM user LIMIT 10"))
    .rows;

  ctx.response.status = Status.OK;
  ctx.response.type = "json";
  ctx.response.body = {
    status: "success",
    message: `${users.length} user found in database`,
    data: { users },
  };
}

/**
 *
 * @param ctx
 */
export const login = async (ctx: any) => {
  const requestbody = await ctx.request.body();
  const email = requestbody.value.email;

  let user: any = (
    await dbclient.execute("SELECT * FROM user WHERE email = ?", [email])
  ).rows;

  if (user.length > 0) {
    const payload: Payload = {
      iss: user[0].email,
      exp: setExpiration(new Date().getTime() + 60000), // 1 minute expiration
    };

    const jwt = makeJwt({ key: Deno.env.get("JWT_KEY") || '', header, payload });

    if (jwt) {
      ctx.cookie.set('jwt', jwt); // set jwt in cookie

      ctx.response.status = Status.OK;
      ctx.response.type = "json";
      ctx.response.body = {
        status: "success",
        message: `User with email# ${email}`,
        data: { user },
        jwt,
      };
    } else {
      ctx.response.status = Status.InternalServerError;
      ctx.response.type = "json";
      ctx.response.body = {
        status: "error",
        message: `Invalid input`,
        data: {},
      };
    }
  } else {
    ctx.throw(Status.NotFound);
  }
};

/**
 *
 * @param ctx
 */
export async function create(ctx: any) {
  ctx.response.status = 201;
  ctx.response.body = {message: "register method"};
}
