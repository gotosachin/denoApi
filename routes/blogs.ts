import { Router } from "https://deno.land/x/oak/mod.ts";

import { index, find, create, update, deleteUser } from "../controllers/blogs.ts";

const router = new Router();

router.get("/blogs", index)
      .get("/blogs/:id", find)
      .post("/blogs", create)
      .put("/blogs/:id", update)
      .delete("/blogs/:id", deleteUser);

export default router;