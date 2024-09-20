//Importing packages
const express = require("express");
const { connectToDb, getDb } = require("./DB/DB");
const PORT = 5678;

//Instance of the sever
const app = express();

//Connecting to the DB
let database = "";

connectToDb((err) => {
//If there is an error we’ll catch it and do nothing,
  if (!err) {
    //Listener
    app.listen(PORT, () => {
      console.log(`LISTENING ON PORT ${PORT}`);
    });
    database = getDb();
  }
});


  //Routes
app.get("/booklist", (req, res) => {
    let bookList = [];
    database.collection("books")
      .find()
      .sort({ genres: 1 })
      .forEach((book) => bookList.push(book))
      .then(() => {
        res.status(200).json(bookList);
      })
      .catch(() => {
        res.status(500).json({ error: "Sorry, your document wasn't found" });
      });
    res.json({ msg: "Requesting books from API" });
  });

