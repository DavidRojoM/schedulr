import * as path from "path";
import { promises as fs } from "fs";
import { Kysely, Migrator, FileMigrationProvider } from "kysely";
import { UnknownAny } from "../types/types";
import { fileURLToPath } from "url";

export async function migrateToLatest(db: Kysely<UnknownAny>) {
  console.log("migrating to latest version");

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: path.join(__dirname, "migrations"),
    }),
  });

  const { error, results } = await migrator.migrateToLatest();

  results?.forEach((migrationResult) => {
    if (migrationResult.status === "Success") {
      console.log(
        `migration "${migrationResult.migrationName}" was executed successfully`
      );
    } else if (migrationResult.status === "Error") {
      console.error(
        `failed to execute migration "${migrationResult.migrationName}"`
      );
    }
  });

  if (error) {
    console.error("failed to migrate");
    console.error(error);
    process.exit(1);
  }
}
