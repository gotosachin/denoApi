import { Context} from "https://deno.land/x/oak/mod.ts";
import { validateJwt } from "https://deno.land/x/djwt/validate.ts";

const userMiddleware = async (ctx: any, next: Function) => {
    const jwt = ctx.cookies.get('jwt');
    if (jwt) {
         // const key = Deno.env.get('JWT_KEY') || '';
        const data: any = await validateJwt(jwt, Deno.env.get('JWT_KEY') || '', {
          isThrowing: false,
        });

        if (data){
            const email = data.payload.iss;
            console.log(email);
            ctx.state.currentUserEmail = email; // This will be awailabe everywhere.
        } else{
            ctx.cookies.delete('jwt');
            ctx.state.currentUserEmail = null;
        }

        console.log(data);
    } else{
        ctx.state.currentUserEmail = null;
    }

    await next();
}

export default userMiddleware;