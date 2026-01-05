import { Router } from "express";
import {
  logout,
  refreshToken,
  signin,
  signup,
} from "../Controllers/auth.controller";

const router = Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/logout", logout);
router.post("/refreshToken", refreshToken);

export default router;
