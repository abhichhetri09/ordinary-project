import fs from "fs";
import path from "path";
import pgPromise from "pg-promise";
import dotenv from "dotenv";

dotenv.config({ path: path.join(__dirname, "../../.env") });

const pgp = pgPromise();
const db = pgp(process.env.DATABASE_URL!);
const migrationsDir = path.resolve(__dirname, "../../migrations");

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

/** Names that refer to the same migration (legacy vs new file naming). */
function migrationAliases(name: string): string[] {
  const aliases = new Set<string>([name]);
  const upMatch = name.match(/^(\d+)_up_(.+)$/);
  if (upMatch) {
    aliases.add(`${upMatch[1]}_${upMatch[2]}`);
  }
  const legacyMatch = name.match(/^(\d+)_(.+)$/);
  if (legacyMatch && !name.includes("_up_") && !name.includes("_down_")) {
    aliases.add(`${legacyMatch[1]}_up_${legacyMatch[2]}`);
  }
  return [...aliases];
}

function isApplied(applied: Set<string>, name: string): boolean {
  return migrationAliases(name).some((alias) => applied.has(alias));
}

function canonicalName(name: string): string {
  const legacyMatch = name.match(/^(\d+)_(.+)$/);
  if (
    legacyMatch &&
    !name.includes("_up_") &&
    !name.includes("_down_")
  ) {
    return `${legacyMatch[1]}_up_${legacyMatch[2]}`;
  }
  return name;
}

function listUpMigrations(): string[] {
  return fs
    .readdirSync(migrationsDir)
    .filter((f) => f.endsWith(".up.sql") || /^\d+_up_.+\.sql$/.test(f))
    .sort();
}

function listDownMigrations(): string[] {
  return fs
    .readdirSync(migrationsDir)
    .filter((f) => f.endsWith(".down.sql") || /^\d+_down_.+\.sql$/.test(f))
    .sort();
}

function nameFromUpFile(file: string): string {
  if (file.endsWith(".up.sql")) {
    return canonicalName(file.replace(".up.sql", ""));
  }
  return file.replace(/\.sql$/, "");
}

function nameFromDownFile(file: string): string {
  if (file.endsWith(".down.sql")) {
    const legacy = file.replace(".down.sql", "");
    const m = legacy.match(/^(\d+)_(.+)$/);
    if (m && !legacy.includes("_down_")) {
      return `${m[1]}_up_${m[2]}`;
    }
    return legacy.replace("_down_", "_up_");
  }
  return file.replace(/\.sql$/, "").replace("_down_", "_up_");
}

function downFileForUp(upFile: string): string | null {
  if (upFile.endsWith(".up.sql")) {
    const candidate = upFile.replace(".up.sql", ".down.sql");
    return fs.existsSync(path.join(migrationsDir, candidate)) ? candidate : null;
  }
  const candidate = upFile.replace("_up_", "_down_");
  return fs.existsSync(path.join(migrationsDir, candidate)) ? candidate : null;
}

export async function migrateUp() {
  const applied = await getApplied();
  const files = listUpMigrations();

  for (const file of files) {
    const name = nameFromUpFile(file);
    if (isApplied(applied, name)) continue;

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
  const upFiles = listUpMigrations().reverse();

  for (const upFile of upFiles) {
    const name = nameFromUpFile(upFile);
    if (!isApplied(applied, name)) continue;

    const downFile = downFileForUp(upFile);
    if (!downFile) {
      console.error(`Missing down migration for: ${upFile}`);
      process.exit(1);
    }

    const storedName = migrationAliases(name).find((alias) => applied.has(alias))!;
    const sql = fs.readFileSync(path.join(migrationsDir, downFile), "utf8");
    await db.tx(async (t) => {
      await t.none(sql);
      await t.none("DELETE FROM schema_migrations WHERE name = $1", [storedName]);
    });
    console.log(`Reverted: ${downFile}`);
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
