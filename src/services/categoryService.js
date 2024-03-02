const category = require("../models/category");
const { errorGen } = require("../utils/errorGen");

const categoryService = {};

categoryService.getAllCategory = async () => {
    return await category.find().lean();
}

categoryService.createCategory = async (data) => {
    const newCategory = await category.create(data);
    if (newCategory) return newCategory;
    else errorGen("something went wrong");
}

categoryService.updateCategory = async (data) => {
    const existing = await category.findById({ _id: data._id });
    if (!existing) errorGen("category not found", 404);
    existing.name = data.name;
    await existing.save();
}

categoryService.addSubCategory = async (data) => {
    const existingCate = await category.findOneAndUpdate({ _id: data.cateId },
        { "$push": { subcategories: { name: data.name, info: data.info } } });

    if (existingCate) return { message: "subcategory added" };
    else errorGen("something went wrong");
}

categoryService.deleteSubCategory = async (data) => {
    const existingCate = await category.findOneAndUpdate({ _id: data.cateId },
        { "$pull": { subcategories: { _id: data.subCateId } } });

    if (existingCate) return { message: "subcategory removed" };
    else errorGen("something went wrong");

}
module.exports = categoryService;