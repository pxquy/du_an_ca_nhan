import { Router } from "express";
import routerUsers from "./users.router";
import routerAuth from "./auth.router";
import routerCategories from "./categories.router";
import routerAuthors from "./authors.router";
import routerBooks from "./books.router";
import routerDateBorrow from "./dateBorrow.router";

const router = Router();

router.use("/users", routerUsers);
router.use("/auth", routerAuth);
router.use("/categories", routerCategories);
router.use("/authors", routerAuthors);
router.use("/books", routerBooks);
router.use("/dateBorrow", routerDateBorrow);

export default router;
