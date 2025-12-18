import { Router } from "express";
import {
  deleteComment,
  createComment,
  getAll,
  getById,
  updateComment,
} from "../Controllers/comments.controller";
import { verifyIWT } from "../middlewares/verifyJWT";

const router = Router();

router.use(verifyIWT("0", "1"));
router.get("/", getAll);
router.get("/:id", getById);
router.post("/", createComment);
router.put("/:id", updateComment);
router.delete("/:id", deleteComment);

export default router;
