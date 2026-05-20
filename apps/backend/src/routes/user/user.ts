import express from "express";
import { db } from "../../db/db";

const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  const data = await db.query("select * from users");
  return res.json(data);
});

userRouter.post("/", async (req, res) => {
  const { name, email, phone, password } = req.body;
  const user = await db.one(
    "INSERT INTO users (name, email, phone, password) VALUES ($1, $2, $3, $4) RETURNING *",
    [name, email, phone, password],
  );
  return res.status(201).json(user);
});

export default userRouter;
