import express from "express";
import { config } from "dotenv";
import path from "path";
import userRouter from "./routes/user/user";
import authRouter from "./routes/auth/auth";
import cors from "cors";
import { connectDb } from "./db/db";

config({ path: path.join(__dirname, "../.env") });

const app = express();
const port = process.env.PORT;
app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use("/auth", authRouter);
app.get("/", (req, res) => {
  return res.json("hello");
});

connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log("server running in port ", port);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
    process.exit(1);
  });
