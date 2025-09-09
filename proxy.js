import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 5000;
const API_KEY = "df08aa37234b4ae1a7a555af34b03850"; // put your Football-Data.org key here

// Allow CORS for API requests
app.use(cors());

// Static frontend serving
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

// Fixtures route
app.get("/fixtures", async (req, res) => {
  const { date } = req.query; // expects YYYY-MM-DD
  const url = `https://api.football-data.org/v4/matches?dateFrom=${date}&dateTo=${date}`;

  try {
    const response = await fetch(url, {
      headers: { "X-Auth-Token": API_KEY }
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Last 6 matches for a team
app.get("/team-matches/:id", async (req, res) => {
  const teamId = req.params.id;
  const url = `https://api.football-data.org/v4/teams/${teamId}/matches?limit=6`;

  try {
    const response = await fetch(url, {
      headers: { "X-Auth-Token": API_KEY }
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fallback → serve index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
