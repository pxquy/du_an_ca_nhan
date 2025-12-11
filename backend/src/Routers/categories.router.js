import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getAll,
  getById,
  updateCategory,
} from "../Controllers/categories.controller";

const router = Router();

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;
