import express from "express";
import { db } from "../../db/db";

const authRouter = express.Router();

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  const user = await db.oneOrNone(
    "SELECT id, name, email, phone, password FROM users WHERE email = $1",
    [email],
  );

  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const { password: _, ...safeUser } = user;
  return res.json({ success: true, user: safeUser });
});

export default authRouter;
