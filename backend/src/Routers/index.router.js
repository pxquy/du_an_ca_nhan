import { Router } from "express";
import routerUsers from "./users.router";
import routerAuth from "./auth.router";
import routerCategories from "./categories.router";

const router = Router();

router.use("/users", routerUsers);
router.use("/auth", routerAuth);
router.use("/categories", routerCategories);

export default router;
