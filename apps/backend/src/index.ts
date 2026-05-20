import express from "express";
import { config } from "dotenv";
import path from "path";
import userRouter from "./routes/user/user";

config({ path: path.join(__dirname, "../.env") });

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use("/user", userRouter);
app.get("/", (req, res) => {
  return res.json("hello");
});

app.listen(port, () => {
  console.log("server running in port ", port);
});
