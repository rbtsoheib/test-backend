// Importing packages
const express = require("express");
const { connectToDb, getDb } = require("./DB/DB");
const { ObjectId } = require("mongodb");

const PORT = 8010;
const app = express(); // Express instance
// Middleware to parse JSON body
app.use(express.json()); // Make sure we can handle JSON in POST requests

// Connect to the database
let database = null;

connectToDb((err) => {
  if (err) {
    console.error("Failed to connect to DB", err);
    process.exit(1); // Exit the process if DB connection fails
  }

  database = getDb(); // Initialize the database connection

  // Start the server only after successful DB connection
  app.listen(PORT, () => {
    console.log(`LISTENING ON PORT ${PORT}`);
  });
});

// Middleware to check database connection
const checkDbConnection = (req, res, next) => {
  if (!database) {
    return res.status(500).json({ error: "Database not initialized" });
  }
  next();
};

// Route to get book list
app.get("/booklist", checkDbConnection, (req, res) => {
  database
    .collection("books")
    .find()
    .sort({ genres: 1 })
    .toArray()
    .then((bookList) => {
      res.status(200).json(bookList);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Sorry, your documents weren't found" });
    });
});

// Route to get product list
app.get("/produitsList", checkDbConnection, (req, res) => {
  database
    .collection("products") // Fixed the collection name
    .find()
    .sort({ genres: 1 })
    .toArray()
    .then((productList) => {
      res.status(200).json(productList);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Sorry, your products weren't found" });
    });
});

// Route to get employees list
app.get("/employeslist", checkDbConnection, (req, res) => {
  database
    .collection("employes")
    .find()
    .sort({ genres: 1 })
    .toArray()
    .then((employeslist) => {
      res.status(200).json(employeslist);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Sorry, your employees weren't found" });
    });
});

// Route to get clients list
app.get("/clientslist", checkDbConnection, (req, res) => {
  database
    .collection("clients")
    .find()
    .sort({ genres: 1 })
    .toArray()
    .then((clientslist) => {
      res.status(200).json(clientslist);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Sorry, your clients weren't found" });
    });
});

// Book/:id route
app.get("/book/:id", checkDbConnection, (req, res) => {
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  database
    .collection("books")
    .findOne({ _id: new ObjectId(id) })
    .then((book) => {
      if (!book) {
        return res.status(404).json({ error: "Book not found" });
      }
      res.status(200).json(book);
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ error: "Sorry, there was an error fetching the book" });
    });
});

// Route to get a client by ID
app.get("/clients/:id", checkDbConnection, (req, res) => {
  const id = req.params.id;

  // Validate the ObjectId
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  database
    .collection("clients")
    .findOne({ _id: new ObjectId(id) }) // Use 'new' here
    .then((client) => {
      if (!client) {
        return res.status(404).json({ error: "Client not found" });
      }
      res.status(200).json(client);
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ error: "Sorry, there was an error fetching the client" });
    });
});

// Booklist post route
app.post("/booklist", checkDbConnection, (req, res) => {
  console.log(req.body); // Log the incoming request body
  const book = req.body;

  database
    .collection("books")
    .insertOne(book)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Sorry, cannot create this new book" });
    });
});

app.post("/employeslist", checkDbConnection, (req, res) => {
  console.log(req.body); // Log the incoming request body
  const employe = req.body;

  database
    .collection("employes")
    .insertOne(employe)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Sorry, cannot create this new book" });
    });
});

//book/id update(patch) route
app.put("/booklist/:id", (req, res) => {
  const update = req.body;

  if (ObjectId.isValid(req.params.id)) {
    const id = new ObjectId(req.params.id);
    database.collection("books")
      .updateOne({ _id: id }, { $set: update })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({ error: "Couldn't update document" });
      });
  }
});

//book/:id delete route
app.delete("/booklist/:id", (req, res) => {
  const id = new ObjectId(req.params.id);
  database.collection("books")
    .deleteOne({ _id: id })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({ msg: "Sorry, this book doesn't exist" });
    });
});

