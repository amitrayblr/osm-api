import express from 'express';
import pool from './db.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/maxspeed', async (req, res) => {
  const lat = parseFloat(req.query.lat);
  const lon = parseFloat(req.query.lon);
  
  // Check for valid lat/lon
  if (Number.isNaN(lat) || Number.isNaN(lon)) {
    return res.status(400).json({ error: 'Invalid lat/lon' });
  }

  try {
    const closestPoint = `
      SELECT
        tags->'maxspeed' AS maxspeed,
        ST_AsText(ST_ClosestPoint(way, ST_SetSRID(ST_MakePoint($1, $2), 4326))) AS snapped_point
      FROM planet_osm_line
      ORDER BY way <-> ST_SetSRID(ST_MakePoint($1, $2), 4326)
      LIMIT 1;
    `;

    // Query the database
    const { rows } = await pool.query(closestPoint, [lon, lat]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'No road found nearby' });
    }

    // Return the result
    const { maxspeed, snapped_point } = rows[0];
    res.json({ maxspeed, snapped_point });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Speed limit service listening on port ${PORT}`);
});