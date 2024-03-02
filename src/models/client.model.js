const mongoose = require("mongoose")

const clientSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: String,
    gender: {
        type: String,
        enum: {
            values: ['Male', 'Female', "Other"],
            message: '{VALUE} is not supported'
        }
    },
    martial_status: {
        type: String,
        enum: {
            values: ['Married', 'Unmarried'],
            message: '{VALUE} is not supported'
        }
    },
    work_status: {
        type: String,
        enum: {
            values: ['employeed', 'unemployed'],
            message: '{VALUE} is not supported'
        }
    },
    disabled: Boolean,
    password: String,
    contact: {
        type: Number,
        required: true
    },
    address: {
        address: String,
        city: String,
    },
    image: String,
    wallet: {
        balance: {
            type: Number,
            default: 0
        },
    },
    role: {
        type: String,
        enum: ["admin", "client", "lawyer", "staff"]
    },
    disabled: {
        type:Boolean,
        default:false
    },
})

module.exports = mongoose.model("Client", clientSchema);