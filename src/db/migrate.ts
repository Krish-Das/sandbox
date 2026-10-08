import { readdir } from "node:fs/promises"
import { join } from "node:path"
import { pathToFileURL } from "node:url"

import { neon } from "@neondatabase/serverless"

const url = process.env.DATABASE_URL_UNPOOLED
if (!url) throw new Error("DATABASE_URL_UNPOOLED is not set")
const sql = neon(url) // direct

const dir = join(import.meta.dirname, "migrations")

await sql`CREATE TABLE IF NOT EXISTS _migrations (
  name text PRIMARY KEY,
  applied_at timestamptz NOT NULL DEFAULT now()
)`

const applied = new Set(
    // oxlint-disable-next-line typescript/no-unsafe-type-assertion
    (await sql`SELECT name FROM _migrations`).map((r) => r.name as string),
)

const files = (await readdir(dir)).filter((f) => f.endsWith(".ts")).toSorted()

const applyMigration = async (file: string) => {
    const name = file.replace(/\.ts$/, "")
    if (applied.has(name)) return

    // TODO: use ZOD to validate this
    // oxlint-disable-next-line typescript/no-unsafe-type-assertion
    const { up } = (await import(pathToFileURL(join(dir, file)).href)) as {
        up: string[]
    }

    // One atomic transaction: all statements + the record, or nothing.
    await sql.transaction([
        ...up.map((statement) => sql.query(statement)),
        sql`INSERT INTO _migrations (name) VALUES (${name})`,
    ])

    console.log(`applied ${name}`)
}

// Migrations must run in filename order because later migrations may depend on earlier ones.
await files.reduce(
    (previous, file) => previous.then(() => applyMigration(file)),
    Promise.resolve(),
)
console.log("done")