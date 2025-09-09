import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = 5000;
const API_KEY = "YOUR_FOOTBALL_DATA_KEY"; // put your key here

app.use(cors());

// Fixtures for a specific date
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

app.listen(PORT, () =>
  console.log(`✅ Proxy running at http://localhost:${PORT}`)
);