import { Router } from "express";
import {
  deleteBook,
  createBook,
  getAll,
  getById,
  updateBook,
} from "../Controllers/books.controller";
import { verifyIWT } from "../middlewares/verifyJWT";

const router = Router();

router.get("/", getAll);
router.get("/:id", getById);

router.use(verifyIWT("0"));
router.post("/", createBook);
router.put("/:id", updateBook);
router.patch("/:id", updateBook);
router.delete("/:id", deleteBook);

export default router;
