import express from "express";
import { db } from "../../db/db";

const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  const users = await db.any("SELECT * FROM users LIMIT 10 OFFSET 0");
  return res.json(users);
});

userRouter.post("/", async (req, res) => {
  const { name, email, phone, password } = req.body;
  const user = await db.one(
    "INSERT INTO users (name, email, phone, password) VALUES ($1, $2, $3, $4) RETURNING *",
    [name, email, phone, password],
  );
  return res.status(201).json(user);
});

userRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, password } = req.body;
  const user = await db.one(
    `
        UPDATE users SET
          name = COALESCE($1, name), 
          email = COALESCE($2, email), 
          phone = COALESCE($3, phone),
          password = COALESCE($4, password), 
          updated_at = NOW()
        WHERE id = $5
        RETURNING *`,
    [name ?? null, email ?? null, phone ?? null, password ?? null, id],
  );
  return res.json(user);
});
export default userRouter;
