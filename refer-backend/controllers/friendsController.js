const pool = require("../db");

// Add a friend by email
async function addFriend(req, res) {
  const userId = req.user.id;
  const { email } = req.body;

  try {
    const result = await pool.query("SELECT id FROM users WHERE email = $1", [email]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const friendId = result.rows[0].id;

    if (friendId === userId) {
      return res.status(400).json({ error: "You can't add yourself as a friend" });
    }

    await pool.query(
      "INSERT INTO friends (user_id, friend_id) VALUES ($1, $2) ON CONFLICT DO NOTHING",
      [userId, friendId]
    );

    res.status(201).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add friend" });
  }
}

// Get current user's friends
async function getFriends(req, res) {
  const userId = req.user.id;

  try {
    const result = await pool.query(
      `SELECT users.id, users.name, users.email
       FROM friends
       JOIN users ON users.id = friends.friend_id
       WHERE friends.user_id = $1`,
      [userId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get friends" });
  }
}

// Get services posted by friends
async function getFriendServices(req, res) {
  const userId = req.user.id;

  try {
    const result = await pool.query(
      `SELECT services.*, users.name AS owner_name
       FROM friends
       JOIN services ON services.user_id = friends.friend_id
       JOIN users ON users.id = services.user_id
       WHERE friends.user_id = $1
       ORDER BY services.created_at DESC`,
      [userId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get friend services" });
  }
}

module.exports = { addFriend, getFriends, getFriendServices};
