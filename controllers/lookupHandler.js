const getItems = (req, res, db) => {
    db.select("*")
    .from("lookups")
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json("Error"));
}

const addItem = (req, res, db) => {
    const { word } = req.body;
    db("lookups")
        .insert({ word })
        .then(res.json("Sucessfully added."))
        .catch(err => res.status(400).json("Error"));
}

module.exports = { getItems, addItem };