import pgPromise from "pg-promise";
import { config } from "dotenv";
import path from "path";

config({ path: path.join(__dirname, "../../.env") });
const url = process.env.DATABASE_URL;

const pgp = pgPromise();

if (!url) {
  throw new Error("No db url");
}
const db = pgp(url);

export { db };
