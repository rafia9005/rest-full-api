const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const dataFilePath = path.join(__dirname, "data/notes.json");

router.use(express.json());

router.post("/", );

router.get("/", function (req, res) {
  fs.readFile(dataFilePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("An error occurred while reading the file.");
    }

    const posts = JSON.parse(data);

    res.json({
      success: true,
      data: posts,
    });
  });
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
  
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).send('An error occurred while reading the file.');
      }
  
      let posts = JSON.parse(data);
      const postIndex = posts.findIndex(post => post.id === id);
  
      if (postIndex === -1) {
        return res.status(404).json({ message: 'Data not found.' });
      }
  
      posts.splice(postIndex, 1);
  
      fs.writeFile(dataFilePath, JSON.stringify(posts), (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send('An error occurred while saving the data.');
        }
  
        res.status(200).json({ message: 'Data berhasil dihapus.' });
      });
    });
  });

module.exports = router;
