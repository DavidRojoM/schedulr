import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import { Database } from "./tables/database";
import { migrateToLatest } from "./migrator";
import { environment } from "@/config/environment";
import { Nullish } from "../types/types";

let connection: Nullish<Kysely<Database>>;

export async function getConnection(): Promise<Kysely<Database>> {
  if (connection) return connection;

  connection = new Kysely<Database>({
    dialect: new PostgresDialect({
      pool: new Pool({
        user: environment.DB_USER,
        host: environment.DB_HOST,
        database: environment.DB_NAME,
        password: environment.DB_PASSWORD,
        port: environment.DB_PORT,
      }),
    }),
  });

  await migrateToLatest(connection);

  return connection;
}
