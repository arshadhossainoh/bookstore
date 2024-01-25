import express from "express";
import { PORT, mongodbURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

const app = express();

app.get("/", (req, res) => {
  return res.send("hi, welcome lads to mern");
});

// Route for save a new book
app.post("/books", async(req, res));

mongoose
  .connect(mongodbURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is running on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
