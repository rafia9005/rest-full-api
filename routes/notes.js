const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const dataFilePath = path.join(__dirname, "data/notes.json");

router.use(express.json());

var notesControllers = require('../controllers/notesControllers')

router.post("/", notesControllers.post);

router.get("/", notesControllers.get);

router.delete('/:id', notesControllers.delete);

module.exports = router;
