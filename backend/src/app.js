import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import router from "./Routers/index.router";
import { ConnectDB } from "../src/Config/database";
import cookieParser from "cookie-parser";

dotenv.config();
ConnectDB();
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api", router);

app.listen(process.env.PORT, () => {
  console.log(`server đag chạy ${process.env.PORT}`);
});
