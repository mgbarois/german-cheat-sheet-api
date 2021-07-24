const getItems = (req, res, db) => {
    if (req.params.category === undefined) {
        db.select("*")
            .from("tasks")
            .orderBy("id", "desc")
            .then(data => {
                res.json(data);
            })
            .catch(err => res.status(400).json("Error"));
    }
    else {
        db.select("*")
            .from("tasks")
            .where("category", req.params.category)
            .orderBy("id", "desc")
            .then(data => {
                res.json(data);
            })
    }
}

const addItem = (req, res, db) => {
    const { category, task, checked } = req.body;
    db("tasks")
        .insert({ category, task, checked })
        .then(res.json("Sucessfully added."))
        .catch(err => res.status(400).json("Error"));
};

const editItem = (req, res, db) => {
    const { id, category, task, checked } = req.body;
    db("tasks")
        .where("id", id)
        .update({ category, task, checked })
        .then(res.json("Sucessfully edited."))
        .catch(err => res.status(400).json("Error"));
}

const deleteItem = (req, res, db) => {
    const { id } = req.body;
    db("tasks")
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