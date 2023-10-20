// server.js
const express = require('express');
const db = require('./db'); // Import the database configuration
const app = express();
const port = 3000;

app.use(express.json());

// Endpoint to add a search result to the database
app.post('/api/search-results', (req, res) => {
  const { title, description, url } = req.body;
  const sql = 'INSERT INTO search_results (title, description, url) VALUES (?, ?, ?)';
  db.run(sql, [title, description, url], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Search result added', id: this.lastID });
  });
});

// Endpoint to retrieve search results from the database
app.get('/api/search-results', (req, res) => {
  const sql = 'SELECT * FROM search_results';
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
