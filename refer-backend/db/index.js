require("dotenv").config(); // ✅ ensure this is here!
const { Pool } = require("pg");

let pool;

function getPool() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
  }
  return pool;
}

module.exports = getPool();
