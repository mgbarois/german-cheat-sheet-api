const getItems = (req, res, db) => {
    db.select("*")
    .from("vocab")
    .orderBy("de_word", "asc")
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json("Error"));
}

const addItem = (req, res, db) => {
    const { de_word, en_word, pos } = req.body;
    db("vocab")
        .insert({ de_word, en_word, pos })
        .then(res.json("Sucessfully added."))
        .catch(err => res.status(400).json("Error"));
};

const editItem = (req, res, db) => {
    const { de_word, en_word, pos, id } = req.body;
    db("vocab")
    .where("id", id)
    .update({ de_word, en_word, pos })
    .then(res.json("Sucessfully edited."))
    .catch(err => res.status(400).json("Error"));
}

const deleteItem = (req, res, db) => {
    const { id } = req.body;
    db("vocab")
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