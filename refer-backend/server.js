const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

const authRoutes = require("./routes/authRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const friendRoutes = require("./routes/friendRoutes");
const leadRoutes = require("./routes/leadRoutes");



dotenv.config();
console.log("Loaded DATABASE_URL:", process.env.DATABASE_URL); // ← add this line

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(bodyParser.json());
app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/friends", friendRoutes);
app.use("/api/leads", leadRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
