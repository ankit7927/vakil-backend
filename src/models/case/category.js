const mongoose = require("mongoose")

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    logo: String
})

module.exports = mongoose.model("Category", categorySchema);