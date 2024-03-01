const { category } = require("../models/category");


const categoryController = {};

categoryController.createCategory = async (req, res, next) => {
    const data = req.body;
    try {
        const newCategory = await category.create(data);
        if (newCategory) res.json(newCategory);
        else res.status(500).json({ message: "something went wrong" });
    } catch (error) {
        next(error)
    }
}

categoryController.updateCategory = async (req, res, next) => {
    const data = req.body;
    if (!data._id) return res.status(404).json({ message: "id is required" });

    const existing = await category.findOneById({ _id: data._id });
    if (!existing) res.status(404).json({ message: "category not found" });

    existing.name = data.name;

    await existing.save();
    res.json({ message: "category updated" });
}

module.exports = categoryController;