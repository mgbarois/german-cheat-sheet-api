const getItems = (req, res, db) => {
    db.select("*")
    .from("prepositions")
    .orderBy("id", "desc")
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json("Error"));
}

const addItem = (req, res, db) => {
    const { de_prep, en_prep, example } = req.body;
    db("prepositions")
        .insert({ de_prep, en_prep, example })
        .then(res.json("Sucessfully added."))
        .catch(err => res.status(400).json("Error"));
};

const editItem = (req, res, db) => {
    const { de_prep, en_prep, pos, id } = req.body;
    db("prepositions")
    .where("id", id)
    .update({ de_prep, en_prep, example })
    .then(res.json("Sucessfully edited."))
    .catch(err => res.status(400).json("Error"));
}

const deleteItem = (req, res, db) => {
    const { id } = req.body;
    db("prepositions")
    .where("id", id)
    .del()
    .then(res.json("Sucessfully deleted."))
    .catch(err => res.status(400).json("Error"));
}

module.exports = {
    getItems,
    addItem,
    editItem,
    deleteItem,
}