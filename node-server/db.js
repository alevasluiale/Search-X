const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("search.db");

db.run(`CREATE TABLE IF NOT EXISTS search_results (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  description TEXT,
  url TEXT
)`);

module.exports = db;
