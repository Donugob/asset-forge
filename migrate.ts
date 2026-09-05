import { config } from 'dotenv';
config({ path: '.env.local' });
import { neon } from '@neondatabase/serverless';

async function run() {
  const sql = neon(process.env.DATABASE_URL!);
  await sql`
    CREATE TABLE IF NOT EXISTS "generated_asset" (
      "id" text PRIMARY KEY NOT NULL,
      "payload_hash" text NOT NULL,
      "cdn_url" text NOT NULL,
      "format" text NOT NULL,
      "created_at" timestamp DEFAULT now() NOT NULL,
      CONSTRAINT "generated_asset_payload_hash_unique" UNIQUE("payload_hash")
    );
  `;
  console.log("Table created!");
}
run().catch(console.error);
