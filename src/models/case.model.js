const mongoose = require("mongoose")

const caseSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    logo: String,
    subCases: [{
        name: {
            type: String,
            required: true
        },
        logo: String,
        info: String
    }]
})

module.exports = mongoose.model("Case", caseSchema);