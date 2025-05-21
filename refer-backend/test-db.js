require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool
  .query("SELECT NOW()")
  .then((res) => {
    console.log("✅ Connected to PostgreSQL at:", res.rows[0].now);
    pool.end();
  })
  .catch((err) => {
    console.error("❌ Connection failed:", err.message);
    pool.end();
  });
