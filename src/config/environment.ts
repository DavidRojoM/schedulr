import { z } from "zod";

const schema = z.object({
  NODE_ENV: z.string().default("development"),
  DB_HOST: z.string(),
  DB_PORT: z.string().transform((val) => parseInt(val)),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),

  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  // GITHUB_ID: z.string(),
  // GITHUB_SECRET: z.string(),
});

export type Environment = z.infer<typeof schema>;

const parsedSchema = schema.parse(process.env);

export const environment: Environment = {
  ...parsedSchema,
};
