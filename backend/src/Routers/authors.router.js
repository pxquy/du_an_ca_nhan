import { Router } from "express";
import {
  createAuthor,
  deleteAuthor,
  getAll,
  getById,
  updateAuthor,
} from "../Controllers/authors.controller";

const router = Router();

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", createAuthor);
router.put("/:id", updateAuthor);
router.delete("/:id", deleteAuthor);

export default router;
