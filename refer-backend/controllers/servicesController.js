const pool = require("../db");

async function createService(req, res) {
  const { title, reward } = req.body;
  const userId = req.user?.id;

  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  try {
    const result = await pool.query(
      "INSERT INTO services (user_id, title, reward) VALUES ($1, $2, $3) RETURNING *",
      [userId, title, reward]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create service" });
  }
}

async function getMyServices(req, res) {
  const userId = req.user?.id;

  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  try {
    const result = await pool.query(
      "SELECT * FROM services WHERE user_id = $1 ORDER BY created_at DESC",
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch services" });
  }
}

module.exports = { createService, getMyServices };
