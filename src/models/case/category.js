const mongoose = require("mongoose")

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    logo: String,
    subcategories: [mongoose.Schema.ObjectId]
})

module.exports = mongoose.model("Category", categorySchema);