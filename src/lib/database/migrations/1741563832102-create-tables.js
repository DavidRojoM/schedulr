import { sql } from "kysely";

/**
 *
 * @param {import('kysely').Kysely<import('../tables/database').Database} db
 */
export async function up(db) {
  await db.schema
    .createTable("user")
    .addColumn("id", "uuid", (col) => col.primaryKey())
    .addColumn("email", "varchar", (col) => col.notNull().unique())
    .addColumn("provider", "varchar", (col) => col.notNull())
    .addColumn("provider_reference", "varchar", (col) => col.notNull())
    .addColumn("avatar", "varchar")
    .addColumn("name", "varchar")
    .addColumn("access_token", "varchar", (col) => col.notNull())
    .addColumn("refresh_token", "varchar")
    .addColumn("token_expires_at", "timestamp")
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn("updated_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .execute();

  await db.schema
    .createTable("board")
    .addColumn("id", "uuid", (col) => col.primaryKey())
    .addColumn("name", "varchar", (col) => col.notNull())
    .addColumn("description", "text")
    .addColumn("type", "varchar", (col) => col.notNull())
    .addColumn("state", "jsonb", (col) => col.notNull().defaultTo("{}"))
    .addColumn("is_enabled", "boolean", (col) => col.notNull().defaultTo(true))
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn("updated_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .execute();

  await db.schema
    .createTable("permission")
    .addColumn("id", "uuid", (col) => col.primaryKey())
    .addColumn("name", "varchar", (col) => col.notNull())
    .addColumn("description", "text")
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn("updated_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .execute();

  await db.schema
    .createTable("role")
    .addColumn("id", "uuid", (col) => col.primaryKey())
    .addColumn("name", "varchar", (col) => col.notNull().unique())
    .addColumn("description", "text")
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn("updated_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .execute();

  await db.schema
    .createTable("role_permission")
    .addColumn("role_id", "uuid", (col) => col.notNull())
    .addColumn("permission_id", "uuid", (col) => col.notNull())
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn("updated_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addUniqueConstraint("role_permission_unique", ["role_id", "permission_id"])
    .addForeignKeyConstraint("role_permissions_role_FK", ["role_id"], "role", [
      "id",
    ])
    .addForeignKeyConstraint(
      "role_permissions_permissions_FK",
      ["permission_id"],
      "permission",
      ["id"]
    )
    .execute();

  await db.schema
    .createTable("board_user")
    .addColumn("board_id", "uuid", (col) => col.notNull())
    .addColumn("user_id", "uuid", (col) => col.notNull())
    .addColumn("role_id", "uuid", (col) => col.notNull())
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn("updated_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addUniqueConstraint("board_user_unique", ["board_id", "user_id"])
    .addForeignKeyConstraint("board_user_board_FK", ["board_id"], "board", [
      "id",
    ])
    .addForeignKeyConstraint("board_user_user_FK", ["user_id"], "user", ["id"])
    .addForeignKeyConstraint("board_user_role_FK", ["role_id"], "role", ["id"])
    .execute();

  await db.schema
    .createTable("invited_user")
    .addColumn("id", "uuid", (col) => col.primaryKey())
    .addColumn("email", "varchar", (col) => col.notNull())
    .addColumn("token", "varchar", (col) => col.notNull())
    .addColumn("role_id", "uuid", (col) => col.notNull())
    .addColumn("scope", "varchar", (col) => col.notNull())
    .addColumn("scope_id", "uuid", (col) => col.notNull())
    .addColumn("status", "varchar", (col) => col.notNull())
    .addColumn("accepted_at", "timestamp")
    .addColumn("is_enabled", "boolean", (col) => col.notNull().defaultTo(true))
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn("updated_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addForeignKeyConstraint("invited_user_role_FK", ["role_id"], "role", [
      "id",
    ])
    .addUniqueConstraint("invited_user_unique", ["email", "scope", "scope_id"])
    .execute();
}

/**
 *
 * @param {import('kysely').Kysely<import('../tables/database').Database} db
 */
export async function down(db) {
  await db.schema.dropTable("invited_user").execute();
  await db.schema.dropTable("board_user").execute();
  await db.schema.dropTable("role_permission").execute();
  await db.schema.dropTable("user").execute();
  await db.schema.dropTable("board").execute();
  await db.schema.dropTable("role").execute();
  await db.schema.dropTable("permission").execute();
}
