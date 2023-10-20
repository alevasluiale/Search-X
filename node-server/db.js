const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("search.db");

db.run(`CREATE TABLE IF NOT EXISTS items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  description TEXT,
  url TEXT,
  visited INTEGER DEFAULT 0
)`);



module.exports = db;
