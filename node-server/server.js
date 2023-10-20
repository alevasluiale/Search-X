const express = require('express');
const db = require('./db');
const app = express();
const port = 3000;

app.use(express.json());

// Endpoint to add a search result to the database
app.post('/api/search-results', (req, res) => {
  const { title, description, url } = req.body;
  const sql = 'INSERT INTO items (title, description, url) VALUES (?, ?, ?)';
  db.run(sql, [title, description, url], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Search result added', id: this.lastID });
  });
});

// Endpoint to retrieve search results from the database
app.get('/api/search-results', (req, res) => {
  const sql = 'SELECT * FROM items';
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Endpoint to search by title (full-text search)
app.get('/api/search-title', (req, res) => {
  const { query } = req.query;
  if(!query) res.json([]);
  else {
    const sql = 'SELECT * FROM items WHERE title LIKE ?';
    db.all(sql, [`${query}%`], (err, rows) => {
      if (err) {
        return res.status(500).json({error: err.message});
      }
      res.json(rows);
    });
  }
});

// Endpoint to update the "visited" column based on ID
app.post('/api/update-visited', (req, res) => {
  const { id, visited } = req.body;

  const sql = 'UPDATE items SET visited = ? WHERE id = ?';
  db.run(sql, [visited, id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({ message: 'Visited column updated'});
  });
});

// Endpoint to perform a full-text search on title, description, and URL
app.get('/api/search', (req, res) => {
  const { query } = req.body;
  const sql = `SELECT * FROM items WHERE title LIKE ? OR description LIKE ? OR url LIKE ?`;
  const searchQuery = `%${query}%`;
  db.all(sql, [searchQuery], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Endpoint to perform a full-text search on title, description, and URL
app.get('/api/search', (req, res) => {
  const { query } = req.body;
  const sql = `SELECT * FROM items WHERE title LIKE ? OR description LIKE ? OR url LIKE ?`;
  const searchQuery = `%${query}%`;
  db.all(sql, [searchQuery], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
