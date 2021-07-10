const express = require("express");
const cors = require("cors");
const knex = require("knex");

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

// VOCAB
app.get("/gcs/vocab", (req, res) => {
    db.select("*")
    .from("vocab")
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json("Error"));
})

app.post("/gcs/addVocab", (req, res) => {
    const { de_word, en_word, pos } = req.body;
    db("vocab")
    .insert({ de_word, en_word, pos })
    .then(res.json("Sucessfully added."))
    .catch(err => res.status(400).json("Error")); 
})

app.put("/gcs/editVocab", (req, res) => {
    const { de_word, en_word, pos, id } = req.body;
    db("vocab")
    .where("id", id)
    .update({ de_word, en_word, pos })
    .then(res.json("Sucessfully edited."))
    .catch(err => res.status(400).json("Error"));    
})

app.delete("/gcs/deleteVocab", (req, res) => {
    const { id } = req.body;
    db("vocab")
    .where("id", id)
    .del()
    .then(res.json("Sucessfully deleted."))
    .catch(err => res.status(400).json("Error"));
})

// DICTIONARY LOOKUPS
// CREATE TABLE dictLookups (count smallInt);
app.get("/gcs/dictLookups", (req, res) => {
    db.select("*")
    .from("dictLookups")
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json("Error"));
})

// PREPOSITIONS
// CREATE TABLE prepositions (de text, en text, example text);
app.get("/gcs/prepositions", (req, res) => {
    db.select("*")
    .from("prepositions")
    .then(data => {
        res.json(data[0].count);
    })
    .catch(err => res.status(400).json("Error"));
})

// TASKS
// CREATE TABLE tasks (id PRIMARY KEY, category text, task text, done bool);
app.get("/gcs/tasks", (req, res) => {
    db.select("*")
    .from("prepositions")
    .then(data => {
        res.json(data[0].count);
    })
    .catch(err => res.status(400).json("Error"));
})

app.post("/gcs/addTask", (req, res) => {
    const { category, task, done } = req.body;
    db("tasks")
    .insert({ category, task, done })
    .then(res.json("Sucessfully added."))
    .catch(err => res.status(400).json("Error")); 
})

app.put("/gcs/editTask", (req, res) => {
    const { id, task, status } = req.body;
    db("tasks")
    .where("id", id)
    .update({ task, status })
    .then(res.json("Sucessfully edited."))
    .catch(err => res.status(400).json("Error"));    
})

app.delete("/gcs/deleteTask", (req, res) => {
    const { id } = req.body;
    db("tasks")
    .where("id", id)
    .del()
    .then(res.json("Sucessfully deleted."))
    .catch(err => res.status(400).json("Error"));
})

// RESOURCES


app.listen(3001);