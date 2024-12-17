const { Pool } = require("pg");

// Use Heroku's DATABASE_URL if available, otherwise fallback to local database
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false, // Enable SSL for Heroku
});

// Test the connection upon initialization
pool.connect((err, client, release) => {
  if (err) {
    console.error("Connection error:", err.stack);
  } else {
    console.log("Connected to the database successfully!");
    release();
  }
});

module.exports = pool;
