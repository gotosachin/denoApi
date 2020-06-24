import { Router } from "https://deno.land/x/oak/mod.ts";

import { index, create, login} from "../controllers/auth.ts";

import authMiddleware from "../middleware/authMiddleware.ts";

const router = new Router();

router
  .get("/guest", index)
  .post("/register", authMiddleware, create)
  .post("/login", login);

export default router;