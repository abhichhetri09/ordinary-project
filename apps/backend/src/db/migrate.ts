import fs from "fs";
import path from "path";

const name = process.argv[2];
if (!name) {
  console.error("Usage: npm run migrate:create -- <slug>");
  process.exit(1);
}

const stamp = new Date()
  .toISOString()
  .replace(/[-:T.Z]/g, "")
  .slice(0, 14); // 20250520143000

const slug = name.replace(/\s+/g, "_").toLowerCase().replace(/[^a-z0-9_]/g, "");

const dir = path.resolve(__dirname, "../../migrations");

fs.mkdirSync(dir, { recursive: true });

const up = path.join(dir, `${stamp}_up_${slug}.sql`);
const down = path.join(dir, `${stamp}_down_${slug}.sql`);

fs.writeFileSync(up, "-- write UP migration here\n");
fs.writeFileSync(down, "-- write DOWN migration here\n");

console.log(`Created:\n  ${up}\n  ${down}`);
