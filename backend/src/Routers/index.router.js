import { Router } from "express";
import routerUsers from "./users.router";
import routerAuth from "./auth.router";

const router = Router();

router.use("/users", routerUsers);
router.use("/auth", routerAuth);

export default router;
