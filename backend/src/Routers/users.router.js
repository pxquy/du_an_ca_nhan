import { Router } from "express";
import { getAll, information } from "../Controllers/users.controller";
import { verifyIWT } from "../middlewares/verifyJWT";

const router = Router();

router.get("/", getAll);

router.use(verifyIWT("0", "1"));

router.get("/information", information);

export default router;
