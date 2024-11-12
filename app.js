require("dotenv").config();
const express = require("express");
const path = require('path');
const mysql = require("mysql2");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to the database");

  const createTableSQL = `
        CREATE TABLE IF NOT EXISTS users (
            userId INT AUTO_INCREMENT PRIMARY KEY,
            userName VARCHAR(100) NOT NULL,
            emailId VARCHAR(100) NOT NULL
        );
    `;

  db.query(createTableSQL, (err, result) => {
    if (err) throw err;
    console.log("Users table created or already exists");
  });
});

app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "home.html"));
});

//Create a User
app.post("/users", (req, res) => {
  console.log("Request Body:", req.body); // Log the request body
  const { userName, emailId } = req.body;
  if (!userName || !emailId) {
    return res
      .status(400)
      .json({ message: "userName and emailId are required" });
  }
  const sql = "INSERT INTO users (userName, emailId) VALUES (?, ?)";
  db.query(sql, [userName, emailId], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ userId: result.insertId, userName, emailId });
  });
});

//Retrieve all Users
app.get("/users", (req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

//Retrieve a single User
app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM users WHERE userId = ?";
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0)
      return res.status(404).json({ message: "User not found" });
    res.json(results[0]);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
