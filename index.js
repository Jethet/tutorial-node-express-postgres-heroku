const express = require("express");
const cors = require("cors");
const { pool } = require("./config");
const { Router } = require("express");

const app = express();

app.use(cors());
app.use(express.json());

const getBooks = (req, res) => {
  pool.query("SELECT * FROM books", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

const addBook = (req, res) => {
  const {autor, title} = req.body

  pool.query(
    "INSERT INTO books (author, title) VALUES ($1, $2)",
    [author, title],
    (error) => {
      if (error) {
        throw error;
      }
      res.status(201).json({ status: "success", message: "Book added." });
    }
  );
};

app
  .route("/books")
  // GET endpoint
  .get(getBooks)
  // POST endpoint
  .post(addBook)

app.listen(process.env.PORT || 3002, () => {
  console.log("Server listening");
});
