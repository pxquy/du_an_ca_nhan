import { Router } from "express";
import {
  createBorrowItem,
  getAll,
  getById,
  updateBorrowItem,
} from "../Controllers/borrowItem.controller";
import { verifyIWT } from "../middlewares/verifyJWT";

const router = Router();

router.get("/", getAll);
router.get("/:id", getById);

router.use(verifyIWT("0"));
router.post("/", createBorrowItem);
router.patch("/:id", updateBorrowItem);
router.put("/:id", updateBorrowItem);

export default router;
