import express from "express";
import { db } from "../../db/db";

const authRouter = express.Router();

authRouter.post("/create", async (req, res) => {
  const { email, password } = req.body;

  const user = await db.oneOrNone("SELECT ");
});
