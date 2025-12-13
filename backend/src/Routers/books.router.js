import { Router } from "express";
import {
  deleteBook,
  createBook,
  getAll,
  getById,
  updateBook,
} from "../Controllers/books.controller";

const router = Router();

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", createBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

export default router;
