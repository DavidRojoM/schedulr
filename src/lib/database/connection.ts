import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import { Database } from "./tables/database";
import { migrateToLatest } from "./migrator";
import { environment } from "@/config/environment";

export const dbConnection = new Kysely<Database>({
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

await migrateToLatest(dbConnection);
