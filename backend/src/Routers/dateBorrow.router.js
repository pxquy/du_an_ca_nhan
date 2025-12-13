import { Router } from "express";
import { getAll, getById } from "../Controllers/dateBorrow.controller";
import { createDateBorrow } from "../Controllers/dateBorrow.controller";
import { updateDateBorrow } from "../Controllers/dateBorrow.controller";

const router = Router();

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", createDateBorrow);
router.put("/:id", updateDateBorrow);

export default router;
