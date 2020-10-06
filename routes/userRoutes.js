const express = require('express');
const asynchHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const Book = require('../models/Book');
const User = require('../models/User');
const authTokenGenerator = require('../utils/authTokenGenerator');
const userRouter = express.Router();

//Create user
bookRouter.post(
  '/',
  asynchHandler(async (req, res) => {
    const { category, author, title } = req.body;
    const book = await Book.create({ category, author, title });
    if (book) {
      res.status(200);
      res.json({
        _id: book._id,
        category: book.category,
        title: book.title,
        author: book.author,
      });
    }
    res.status(500);
    throw new Error('Server Error');
  })
);

bookRouter.get(
  '/',
  asynchHandler(async (req, res) => {
    const books = await Book.find();
    //Compare password
    if (books) {
      res.status(201);
      res.send(books);
    } else {
      res.status(401);
      throw new Error('Server error');
    }
  })
);

//Delete book

bookRouter.delete(
  '/:id',
  asynchHandler(async (req, res) => {
    try {
      const book = await Book.findByIdAndDelete(req.params.id);
      res.status(200);
      res.send(book);
    } catch (error) {
      res.status(500);
      throw new Error('Server Error');
    }
  })
);

//Update

bookRouter.put(
  '/:id',
  asynchHandler(async (req, res) => {
    try {
      const book = await Book.findByIdAndUpdate(req.params.id, req.body);
      res.status(200);
      res.json(book);
    } catch (error) {
      res.status(500);
      throw new Error('Update failed');
    }
  })
);

//find a book
bookRouter.get(
  '/:id',
  asynchHandler(async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      res.status(200);
      res.send(book);
    } catch (error) {
      res.status(500);
      throw new Error('No book found');
    }
  })
);

module.exports = { bookRouter };
