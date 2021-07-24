const getItems = (req, res, db) => {
    db.select("*")
    .from("resources")
    .orderBy("id", "desc")
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json("Error"));
}

const addItem = (req, res, db) => {
    const { name, link } = req.body;
    db("resources")
        .insert({ name, link })
        .then(res.json("Sucessfully added."))
        .catch(err => res.status(400).json("Error"));
};

const editItem = (req, res, db) => {
    const { id, name, link } = req.body;
    db("resources")
    .where("id", id)
    .update({ name, link })
    .then(res.json("Sucessfully edited."))
    .catch(err => res.status(400).json("Error"));
}

const deleteItem = (req, res, db) => {
    const { id } = req.body;
    db("resources")
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