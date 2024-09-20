// Importing packages
const express = require("express");
const { connectToDb, getDb } = require("./DB/DB");

const PORT = 8080;
const app = express(); // Express instance

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
      res.status(500).json({ error: "Sorry, your document wasn't found" });
    });
});

// Route to get product list
app.get("/produitsLIst", checkDbConnection, (req, res) => {
  database
    .collection("prodcuts")
    .find()
    .sort({ genres: 1 })
    .toArray()
    .then((productList) => {
      res.status(200).json(productList);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Sorry, your product wasn't found" });
    });
});

// Route to get employes list
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
      res.status(500).json({ error: "Sorry, your product wasn't found" });
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
      res.status(500).json({ error: "Sorry, your product wasn't found" });
    });
});

//book/:id route
app.get("/book/:id", (req, res) => {
  const id = new ObjectId(req.params.id);
  db.collection("books")
    .findOne({ _id: id })
    .then((book) => {
      res.status(200).json(book);
    })
    .catch((err) => {
      res.status(500).json({ msg: "Sorry, this book doesn't exist" });
    });
});

// Route to get a client by ID
app.get("/clients/:id", (req, res) => {
  const id = req.params.id;

  // Validate the ObjectId
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  database.collection("clients")
    .findOne({ _id: new ObjectId(id) }) // Use 'new' here
    .then((client) => {
      if (!client) {
        return res.status(404).json({ error: "Client not found" });
      }
      res.status(200).json(client);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Sorry, there was an error fetching the client" });
    });
});
