const { isValidObjectId } = require("mongoose");
const category = require("../models/category");


const categoryController = {};

categoryController.allCategory = async (req, res, next) => {
    const allCategory = await category.find();
    res.json(allCategory);
}


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
    else if (!isValidObjectId(data._id)) return res.status(404).json({ message: "its not an object id" });

    const existing = await category.findOneById({ _id: data._id });
    if (!existing) res.status(404).json({ message: "category not found" });

    existing.name = data.name;

    await existing.save();
    res.json({ message: "category updated" });
}

categoryController.addSubCategory = async (req, res, next) => {
    const { cateId, name, info } = req.body;
    if (!cateId || !name || !info) return res.status(404).json({ message: "all fields are required" });
    else if (!isValidObjectId(cateId)) return res.status(404).json({ message: "its not an object id" });

    const existingCate = await category.findOneAndUpdate({ _id: cateId },
        { "$push": { subcategories: { name: name, info: info } } });

    if (existingCate) res.json({ message: "subcategory added" })
    else res.status(500).json({ message: "something went wrong" });
}

categoryController.deleteSubCategory = async (req, res) => {
    const { cateId, subCateId } = req.body;
    
    if (!isValidObjectId(cateId) || !isValidObjectId(subCateId))
        return res.status(404).json({ message: "its not an object id" });

    const existingCate = await category.findOneAndUpdate({ _id: cateId },
        { "$pull": { subcategories: { _id: subCateId } } });

    if (existingCate) res.json({ message: "subcategory removed" })
    else res.status(500).json({ message: "something went wrong" });
}

module.exports = categoryController;