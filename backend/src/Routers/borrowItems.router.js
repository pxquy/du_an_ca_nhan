import { Router } from "express";
import {
  createBorrowItem,
  getAll,
  getById,
  updateBorrowItem,
} from "../Controllers/borrowItem.controller";

const router = Router();

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", createBorrowItem);
router.patch("/:id", updateBorrowItem);
router.put("/:id", updateBorrowItem);

export default router;
