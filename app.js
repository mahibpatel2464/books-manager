const express = require("express");
const mongoose = require("mongoose");
const Book = require("./models/book");

const app = express();
app.use(express.json());


mongoose.connect("mongodb://127.0.0.1:27017/booksDB")
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log(err));


app.post("/books", async (req, res) => {
    try {
        const book = new Book(req.body);
        await book.save();
        res.send("📚 Book Added Successfully!");
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get("/books", async (req, res) => {
    const books = await Book.find();
    res.json(books);
});

app.put("/books/:id", async (req, res) => {
    await Book.findByIdAndUpdate(req.params.id, req.body);
    res.send("✏️ Book Updated!");
});

app.delete("/books/:id", async (req, res) => {
    await Book.findByIdAndDelete(req.params.id);
    res.send("🗑️ Book Deleted!");
});

app.listen(3000, () => {
    console.log("🚀 Server running on port 3000");
});
