import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

// Route for save a new book
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.send({
        message: "all required fields: title, author, publishYear",
      });
    }

    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    const book = await Book.create(newBook);
    return res.send(book);
  } catch (error) {
    console.log(error.message);
    res.send({ message: error.message });
  }
});

// Route to get all books from database
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    res.send({ message: error.message });
  }
});

// Route to get 1 book from database by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.json(book);
  } catch (error) {
    console.log(error.message);
    res.send({ message: error.message });
  }
});

// Route for update a book
router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.send({ message: "Send all required fields" });
    }

    const { id } = req.params;

    const result = await Book.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.json({ message: "book not found" });
    }

    return res.send({ message: "book updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.send({ message: error.message });
  }
});

// Route to delete a book
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return res.json({ message: "book not found" });
    }

    return res.send({ message: "book deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.send({ message: error.message });
  }
});

export default router;
