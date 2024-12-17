require('dotenv').config();

const express = require("express");
const cors = require("cors");
const pool = require("./db");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Allow JSON request bodies
const jwtSecret = process.env.JWT_SECRET;


// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");  // Extract token from the header
  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;  // Attach user info to the request object
    next();
  } catch (err) {
    console.error("JWT verification failed:", err);
    res.status(400).json({ message: "Invalid token" });
  }
};

// Create a new todo for the authenticated user
app.post("/todos", verifyToken, async (req, res) => {
  const { description } = req.body;
  const userId = req.user.userId; // Get the user ID from the decoded token

  try {
    const result = await pool.query(
      "INSERT INTO todo (user_id, description, created_at) VALUES ($1, $2, CURRENT_TIMESTAMP) RETURNING *",
      [userId, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Get all todos for the authenticated user
app.get("/todos", verifyToken, async (req, res) => {
  const userId = req.user.userId; // Get the user ID from the decoded token

  try {
    const result = await pool.query("SELECT * FROM todo WHERE user_id = $1 ORDER BY todo_id", [userId]);
    res.json(result.rows); // Send the todos of the authenticated user
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Update a todo by ID for the authenticated user
// Update todo (mark as completed)
// Update a todo by ID for the authenticated user (Only for description change)
app.put("/todos/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;  // Get the description (if editing)
  const userId = req.user.userId; // Get the user ID from the decoded token

  try {
    // Update the description for the todo in the database (without completed)
    const result = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2 AND user_id = $3 RETURNING *",
      [description, id, userId]  // Only updating description
    );

    // If no rows were updated, it means the todo was not found
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(result.rows[0]);  // Return the updated todo
  } catch (err) {
    console.error("Error updating todo:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});


// Delete a todo by ID for the authenticated user
app.delete("/todos/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId; // Get the user ID from the decoded token

  try {
    const result = await pool.query(
      "DELETE FROM todo WHERE todo_id = $1 AND user_id = $2 RETURNING *",
      [id, userId]  // Ensure the user can only delete their own todos
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json({ message: "Todo deleted!", deletedTodo: result.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Route to register a new user
app.post("/api/signup", async (req, res) => {
  const { username, email, password } = req.body;

  const userExists = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  if (userExists.rows.length > 0) {
    return res.status(400).json({ error: "Email already exists" });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      [username, email, hashedPassword]
    );

    const token = jwt.sign({ userId: newUser.rows[0].user_id }, jwtSecret, { expiresIn: "1h" });
    res.status(201).json({ message: "User created successfully", token });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Login route
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (user.rows.length === 0) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.rows[0].password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.rows[0].user_id }, jwtSecret, { expiresIn: "1h" });
    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});


(async () => {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("Connection successful:", res.rows[0]);
  } catch (err) {
    console.error("Connection error:", err.message);
  }
})();


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
