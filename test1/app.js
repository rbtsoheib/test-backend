//Importing packages
const express = require("express");
const PORT = 5678;

//Instance of the sever
// const app = express();
const App = express();
//Routes
// app.get("/booklist", (req, res) => {
//   res.json({ msg: "Requesting books from API" });
// });

App.get("/soso", (req,res) => {
    res.json({ msg : "welcome to the k7alech nightclub HURAYYYYYYYYYYY, enjoy ur stay and make sure to be ka7loch"})
});

//Listener
// app.listen(PORT, () => {
//   console.log(`LISTENING ON PORT ${PORT}`);
// });

App.listen(PORT, () => {
    console.log(`LISTENING ON PORT ${PORT}`);
});
