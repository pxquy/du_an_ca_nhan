import { Router } from "express";
import { getDashboardStatistical } from "../Controllers/statistical.controller";

const router = Router();

router.get("/", getDashboardStatistical);

export default router;
