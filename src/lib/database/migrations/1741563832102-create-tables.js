import { sql } from "kysely";

/**
 *
 * @param {import('kysely').Kysely} db
 */
export async function up(db) {
  await db.schema.dropTable("*").ifExists().execute();

  await db.schema
    .createTable("user")
    .addColumn("id", "uuid", (col) => col.primaryKey())
    .addColumn("email", "varchar", (col) => col.notNull().unique())
    .addColumn("password", "varchar", (col) => col)
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn("updated_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .execute();

  await db
    .insertInto("user")
    .values({
      id: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
      email: "davidrojomdev@gmail.com",
    })
    .execute();
}

/**
 *
 * @param {import('kysely').Kysely} db
 */
export async function down(db) {
  await db.schema.dropTable("user").ifExists().execute();
}
