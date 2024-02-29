const mongoose = require("mongoose")

const subCategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    logo: String,
    info: String
})

module.exports = mongoose.model("Subcategory", subCategorySchema);