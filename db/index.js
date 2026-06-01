// ============================================================
// db/index.js
// This file sets up the connection to the PostgreSQL database.
// ============================================================
//
// ✏️  TASK (COMMENT): Add a comment above EACH of the 5 marked sections below
//     explaining what that line or block of code does.
//     Your comments should be in your own words.
//     You will NOT change any of the actual code — only add comments.
//
// ============================================================

// SECTION 1 — add your comment here: Connects to a PostgreSQL database (pg).
// Reads or writes files (fs).
//Works with file paths (path).
//Loads configuration values from a .env file (dotenv).
const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

// SECTION 2 — add your comment here: This code creates a PostgreSQL connection pool using the database URL stored in the `DATABASE_URL` environment variable. It also enables SSL encryption for secure database communication and disables certificate verification to support certain cloud-hosted PostgreSQL services.

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// SECTION 3 — add your comment here:This code creates the full file path to schema.sql by combining the current directory (__dirname) with the file name. It then reads the contents of schema.sql as UTF-8 text and stores the result in the schema variable.
const schemaPath = path.join(__dirname, "schema.sql");
const schema = fs.readFileSync(schemaPath, "utf8");

// SECTION 4 — add your comment here: This code immediately executes an asynchronous function that runs the SQL commands stored in schema against the PostgreSQL database. If the query succeeds, it logs a success message indicating the tables were created or verified; if it fails, it catches the error and logs a failure message.
(async () => {
  try {
    await pool.query(schema);
    console.log("✅ Tables ensured from schema.sql");
  } catch (err) {
    console.error("❌ Failed to run schema.sql:", err);
  }
})();

// SECTION 5 — add your comment here: This code exports the pool object so it can be imported and used in other files within the application. This allows different parts of the program to share the same PostgreSQL connection pool for executing database queries.
module.exports = pool;
