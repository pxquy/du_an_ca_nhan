import { Router } from "express";
import { getAll, information, lockUser } from "../Controllers/users.controller";
import { verifyIWT } from "../middlewares/verifyJWT";

const router = Router();

router.get("/", getAll);

router.use(verifyIWT("0", "1"));

router.get("/information", information);

router.use(verifyIWT("0"));

router.patch("/lock-user/:id", lockUser);
export default router;
