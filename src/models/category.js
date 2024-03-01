const mongoose = require("mongoose")

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    logo: String,
    subcategories: [{
        name: {
            type: String,
            required: true
        },
        logo: String,
        info: String
    }]
})

module.exports = mongoose.model("Category", categorySchema);