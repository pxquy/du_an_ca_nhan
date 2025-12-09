import dotenv from "dotenv";
import express from "express";
import router from "./Routers/index.router";

dotenv.config();
const app = express();

app.use("/api", router);

app.listen(process.env.PORT, () => {
  console.log(`server đag chạy ${process.env.PORT}`);
});
