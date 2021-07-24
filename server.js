const express = require("express");
const cors = require("cors");
const knex = require("knex");

const vocabHandler = require("./controllers/vocabHandler");
const lookupHandler = require("./controllers/lookupHandler");
const taskHandler = require("./controllers/taskHandler");
const resourceHandler = require("./controllers/resourceHandler");
const submitForm = require("./controllers/portfolioHandler");



const app = express();
app.use(express.json());
app.use(cors());

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "postgres",
    database: "germanvocab",
  },
});


app.get("/", (req, res) => {
    res.json("Connected to german-cheat-sheet-api")
})

// VOCAB
//CREATE TABLE vocab (id serial NOT NULL PRIMARY KEY, de_word VARCHAR (100) NOT NULL, en_word VARCHAR (100) NOT NULL, pos 
app.get("/vocab", (req, res) => { vocabHandler.getItems(req, res, db) });

app.post("/addVocab", (req, res) => { vocabHandler.addItem(req, res, db) });

app.put("/editVocab", (req, res) => { vocabHandler.editItem(req, res, db) });

app.delete("/deleteVocab", (req, res) => { vocabHandler.deleteItem(req, res, db) });

// DICTIONARY LOOKUPS
// CREATE TABLE lookups (word text, id serial NOT NULL PRIMARY KEY);

app.get("/lookup", (req, res) => { lookupHandler.getItems(req, res, db) });

app.post("/addLookup", (req, res) => { lookupHandler.addItem(req, res, db) });


// PREPOSITIONS
// CREATE TABLE prepositions (de text, en text, example text);
// app.get("/prep", (req, res) => { prepHandler.getItems(req, res, db) });

// app.post("/addPrep", (req, res) => { prepHandler.addItem(req, res, db) });

// app.put("/editPrep", (req, res) => { prepHandler.editItem(req, res, db) });

// app.delete("/deletePrep", (req, res) => { prepHandler.deleteItem(req, res, db) });

// TASKS
// CREATE TABLE tasks (category text, task text, checked boolean, id serial NOT NULL PRIMARY KEY);

app.get("/task/:category?", (req, res) => { taskHandler.getItems(req, res, db) });

app.post("/addTask", (req, res) => { taskHandler.addItem(req, res, db) });

app.put("/editTask", (req, res) => { taskHandler.editItem(req, res, db) });

app.delete("/deleteTask", (req, res) => { taskHandler.deleteItem(req, res, db) });

// RESOURCES
//create table resources (name text, link text, id serial NOT NULL PRIMARY KEY);

app.get("/resource", (req, res) => { resourceHandler.getItems(req, res, db) });

app.post("/addResource", (req, res) => { resourceHandler.addItem(req, res, db) });

app.put("/editResource", (req, res) => { resourceHandler.editItem(req, res, db) });

app.delete("/deleteResource", (req, res) => { resourceHandler.deleteItem(req, res, db) });

app.listen(process.env.PORT || 3001, () => {
    console.log(`App is runnin on port ${process.env.PORT}`);
});