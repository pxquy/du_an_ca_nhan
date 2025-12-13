import { Router } from "express";
import { getAll } from "../Controllers/users.controller";

const router = Router();

router.get("/", getAll);

export default router;
