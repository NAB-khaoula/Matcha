const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  password: "12345",
  database: "matchadb",
  port: 5432,
});

async function createTables() {
  //ANCHOR create User table
  await pool.query(`CREATE TABLE IF NOT EXISTS "users" (
        "user_id" integer PRIMARY KEY,
        "email" varchar(255) UNIQUE NOT NULL,
        "username" varchar(255) UNIQUE NOT NULL,
        "lastname" varchar(255),
        "firstname" varchar(255),
        "password_hashed" varchar(255) NOT NULL,
        "gender" varchar(50),
        "bio" text,
        "profile_picture" varchar(255),
        "location" varchar(255),
        "show_location" boolean DEFAULT false,
        "fame_rating" integer DEFAULT 10,
        "last_online" timestamp,
        "created_at" timestamp
      );
      `);

  //ANCHOR create view table and add foreign key referencing to a user_id
  await pool.query(`CREATE TABLE IF NOT EXISTS "views" (
      "view_id" integer PRIMARY KEY,
      "viewed_id" integer,
      "viewer_id" integer,
      "viewed_at" timestamp
      );
      ALTER TABLE "views" ADD FOREIGN KEY ("viewer_id") REFERENCES "users" ("user_id");
      ALTER TABLE "views" ADD FOREIGN KEY ("viewed_id") REFERENCES "users" ("user_id");
      `);

  // ANCHOR create like table and add foreign key referencing to a user_id
  await pool.query(`CREATE TABLE IF NOT EXISTS "like" (
        "like_id" integer PRIMARY KEY,
        "liker_id" integer,
        "liked_id" integer,
        "liked_at" timestamp
      );
      ALTER TABLE "like" ADD FOREIGN KEY ("liker_id") REFERENCES "users" ("user_id");
      ALTER TABLE "like" ADD FOREIGN KEY ("liked_id") REFERENCES "users" ("user_id");
      `);

  // ANCHOR create match table and add foreign key referencing to a user_id
  await pool.query(`CREATE TABLE IF NOT EXISTS "match" (
        "match_id" integer PRIMARY KEY,
        "user1_id" integer,
        "user2_id" integer
      );
      ALTER TABLE "match" ADD FOREIGN KEY ("user1_id") REFERENCES "users" ("user_id");
      ALTER TABLE "match" ADD FOREIGN KEY ("user2_id") REFERENCES "users" ("user_id");
      `);

  // ANCHOR create picture table and add foreign key referencing to a user_id
  await pool.query(`CREATE TABLE IF NOT EXISTS "picture" (
    "picture_id" integer PRIMARY KEY,
    "user_id" integer,
    "picture_link" varchar(300),
    "picture_caption" varchar(300)
      );
      ALTER TABLE "picture" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("user_id");
      `);
  // ANCHOR create notification table and add foreign key referencing to a user_id
  await pool.query(`
  DO $$
      BEGIN
          IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'status') THEN
              CREATE TYPE "status" AS ENUM ('sent', 'delivered', 'read');
          END IF;
          IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'type') THEN
              CREATE TYPE "type" AS ENUM ('message', 'notif');
          END IF;
      END
      $$;
  CREATE TABLE IF NOT EXISTS "notification" (
    "notification_id" integer PRIMARY KEY,
    "user_id" integer,
    "notification_content" text,
    "notification_route" varchar(255),
    "notification_status" STATUS,
    "notification_type" TYPE,
    "created_at" timestamp DEFAULT (now())
  );
  ALTER TABLE "notification" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("user_id");
      `);
}

module.exports = createTables;
