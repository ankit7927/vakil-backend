const mongoose = require("mongoose")

const clientSchema = mongoose.Schema({
    profile: {
        name: {
            type: String,
            required: true
        },
        male: Boolean,
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
    },
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
            defeult: 0
        },
    }
})

module.exports = mongoose.model("Client", clientSchema);