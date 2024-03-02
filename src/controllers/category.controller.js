const { isValidObjectId } = require("mongoose");
const categoryService = require("../services/category.service");

const categoryController = {};

categoryController.allCategory = async (req, res, next) => {
    res.json(await categoryService.getAllCategory());
}

categoryController.createCategory = async (req, res, next) => {
    const data = req.body;
    try {
        res.json(await categoryService.createCategory(data))
    } catch (error) {
        next(error)
    }
}

categoryController.updateCategory = async (req, res, next) => {
    const data = req.body;
    if (!data._id) return res.status(404).json({ message: "id is required" });
    else if (!isValidObjectId(data._id)) 
        return res.status(404).json({ message: "its not an object id" });

    try {
        await categoryService.updateCategory(data);
        res.json({ message: "category updated" });
    } catch (error) {
        next(error)
    }
}

categoryController.addSubCategory = async (req, res, next) => {
    const data = { cateId, name, info } = req.body;
    if (!cateId || !name || !info) 
        return res.status(404).json({ message: "all fields are required" });
    else if (!isValidObjectId(cateId)) 
        return res.status(404).json({ message: "its not an object id" });

    try {
        res.json(await categoryService.addSubCategory(data));
    } catch (error) {
        next(error)
    }
}

categoryController.deleteSubCategory = async (req, res) => {
    const data = { cateId, subCateId } = req.body;

    if (!isValidObjectId(cateId) || !isValidObjectId(subCateId))
        return res.status(404).json({ message: "its not an object id" });

    try {
        res.json(await categoryService.deleteSubCategory(data));
    } catch (error) {
        next(error)
    }
}

module.exports = categoryController;