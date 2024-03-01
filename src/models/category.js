const mongoose = require("mongoose")

const subCategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    logo: String,
    info: String
})

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    logo: String,
    subcategories: [subCategorySchema]
})

const category = mongoose.model("Category", categorySchema);

module.exports = { category, subCategorySchema };