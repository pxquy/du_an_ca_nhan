import { Router } from "express";
import {
  deleteComment,
  createComment,
  getAll,
  getById,
  updateComment,
} from "../Controllers/comments.controller";

const router = Router();

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", createComment);
router.put("/:id", updateComment);
router.delete("/:id", deleteComment);

export default router;
