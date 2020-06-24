import { Status } from 'https://deno.land/x/oak/mod.ts';

import dbclient from '../db/mysql.ts';

/**
 * 
 * @param ctx 
 */
export async function index(ctx: any) {
    const users: any = (await dbclient.execute('SELECT * FROM user LIMIT 10')).rows;
        
    ctx.response.status = Status.OK;
    ctx.response.type = 'json';
    ctx.response.body = {
        status: 'success',
        message: `${users.length} user found in database`,
        data: { users },
    }
}

/**
 * 
 * @param ctx 
 */
export async function find(ctx: any) {
    let user: any = (await dbclient.execute("SELECT * FROM user WHERE id = ?", [ctx.params.id])).rows;

    if (user.length > 0) {
    //   const blog = {
    //     id: rows[0].id,
    //     title: rows[0].title,
    //     content: rows[0].content,
    //     created_at: rows[0].created_at,
    //   };
    
      ctx.response.status = Status.OK;
      ctx.response.type = "json";
      ctx.response.body = {
        status: "success",
        message: `User with id ${ctx.params.id}`,
        data: { user },
      };
    } else {
      ctx.throw(Status.NotFound);
    } 
}

/**
 * 
 * @param ctx 
 */
export async function create(ctx: any) {
    console.log(ctx.params);
}

/**
 * 
 * @param ctx 
 */
export async function update(ctx: any) {
    console.log(ctx.params);
}

/**
 * 
 * @param ctx 
 */
export async function deleteUser(ctx: any) {
    console.log(ctx.params);
}