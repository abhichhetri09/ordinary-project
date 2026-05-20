import fs from "fs";
import path from "path";
import pgPromise from "pg-promise";
import dotenv from "dotenv";

dotenv.config({ path: path.join(__dirname, "../../.env") });

const pgp = pgPromise();
const db = pgp(process.env.DATABASE_URL!);
const migrationsDir = path.join(__dirname, "../../migrations");

async function getApplied(): Promise<Set<string>> {
  try {
    const rows = await db.any<{ name: string }>(
      "SELECT name FROM schema_migrations ORDER BY name",
    );
    return new Set(rows.map((r) => r.name));
  } catch (err: unknown) {
    if (
      err &&
      typeof err === "object" &&
      "code" in err &&
      err.code === "42P01"
    ) {
      return new Set();
    }
    throw err;
  }
}

function listMigrations(suffix: ".up.sql" | ".down.sql") {
  return fs
    .readdirSync(migrationsDir)
    .filter((f) => f.endsWith(suffix))
    .sort();
}

export async function migrateUp() {
  const applied = await getApplied();
  const files = listMigrations(".up.sql");

  for (const file of files) {
    const name = file.replace(".up.sql", "");
    if (applied.has(name)) continue;

    const sql = fs.readFileSync(path.join(migrationsDir, file), "utf8");
    await db.tx(async (t) => {
      await t.none(sql);
      await t.none("INSERT INTO schema_migrations (name) VALUES ($1)", [name]);
    });
    console.log(`Applied: ${file}`);
  }
}

export async function migrateDown() {
  const applied = await getApplied();
  const files = listMigrations(".down.sql").reverse();

  for (const file of files) {
    const name = file.replace(".down.sql", "");
    if (!applied.has(name)) continue;

    const sql = fs.readFileSync(path.join(migrationsDir, file), "utf8");
    await db.tx(async (t) => {
      await t.none(sql);
      await t.none("DELETE FROM schema_migrations WHERE name = $1", [name]);
    });
    console.log(`Reverted: ${file}`);
    break;
  }
}

async function main() {
  const command = process.argv[2];

  if (command === "up") {
    await migrateUp();
  } else if (command === "down") {
    await migrateDown();
  } else {
    console.error("Usage: npm run migrate:up | migrate:down");
    process.exit(1);
  }
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => pgp.end());
