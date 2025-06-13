const pool = require("../db");

// Submit a lead
async function createLead(req, res) {
  const senderId = req.user.id;
  const { service_id, note } = req.body;

  try {
    // 1. Check service exists and belongs to a friend
    const check = await pool.query(
      `SELECT services.user_id AS owner_id
       FROM services
       JOIN friends ON friends.friend_id = services.user_id
       WHERE services.id = $1 AND friends.user_id = $2`,
      [service_id, senderId]
    );

    if (check.rows.length === 0) {
      return res.status(403).json({ error: "You can only send leads to friends' services." });
    }

    // 2. Insert lead
    const result = await pool.query(
      `INSERT INTO leads (service_id, sender_id, note)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [service_id, senderId, note]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send lead" });
  }
}
// Get all leads sent by the current user
async function getMyLeads(req, res) {
  const senderId = req.user.id;

  try {
    const result = await pool.query(
      `SELECT leads.id, leads.note, leads.status, leads.created_at,
              services.title AS service_title,
              users.name AS owner_name
       FROM leads
       JOIN services ON services.id = leads.service_id
       JOIN users ON users.id = services.user_id
       WHERE leads.sender_id = $1
       ORDER BY leads.created_at DESC`,
      [senderId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load leads" });
  }
}

// Get leads submitted to services owned by the current user
async function getIncomingLeads(req, res) {
  const ownerId = req.user.id;

  try {
    const result = await pool.query(
      `SELECT leads.id, leads.note, leads.status, leads.created_at,
              services.title AS service_title,
              users.name AS sender_name
       FROM leads
       JOIN services ON services.id = leads.service_id
       JOIN users ON users.id = leads.sender_id
       WHERE services.user_id = $1
       ORDER BY leads.created_at DESC`,
      [ownerId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load incoming leads" });
  }
}
async function updateLeadStatus(req, res) {
  const userId = req.user.id;
  const leadId = req.params.id;
  const { status } = req.body;

  if (!['converted', 'not_converted'].includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  const check = await pool.query(
    `SELECT services.user_id FROM leads
     JOIN services ON services.id = leads.service_id
     WHERE leads.id = $1`, [leadId]
  );

  if (check.rows.length === 0) return res.status(404).json({ error: "Not found" });
  if (check.rows[0].user_id !== userId) return res.status(403).json({ error: "Unauthorized" });

  await pool.query(`UPDATE leads SET status = $1 WHERE id = $2`, [status, leadId]);
  res.json({ success: true });
}

module.exports = {
  createLead,
  getMyLeads,
  getIncomingLeads,
  updateLeadStatus,
};
