import pgPromise from "pg-promise";
import { config } from "dotenv";
import path from "path";

config({ path: path.join(__dirname, "../../.env") });

const url = process.env.DATABASE_URL;

if (!url) {
  throw new Error("No db url");
}

const pgp = pgPromise();
const db = pgp(url);

async function connectDb() {
  await db.one("SELECT 1");
  console.log("========= Database connected =========");
}

export { db, connectDb };
