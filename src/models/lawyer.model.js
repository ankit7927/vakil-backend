const mongoose = require("mongoose")

const lawyerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        //required:true
    },
    birth_date: {
        type: Date,
        //required:true
    },
    experience: {
        year: {
            type: Number,
            default: 0
        },
        remark: String
    },
    bio: String,
    bar: {
        enrolled: Boolean,
        enrollment_id: {
            type: Number,
            required: true
        },
        certificate: {
            type: String,
            required: true
        }
    },
    contact: {
        type: Number,
        unique: true,
        required: true
    },
    image: String,
    contribution_hours: {
        type: Number,
        default: 1
    },
    qualifications: [String],
    specializations: {
        categories: [String],
        subcategories: [String]
    },
    martial_status: {
        type: String,
        enum: {
            values: ['Married', 'Unmarried'],
            message: '{VALUE} is not supported'
        }
    },
    gender: {
        type: String,
        enum: {
            values: ['Male', 'Female', "Other"],
            message: '{VALUE} is not supported'
        }
    },
    trial_lawyer: {
        is_lawyer: {
            type: Boolean,
            default: false
        },
        year: Number
    },
    address: {
        address: String,
        city: String,
        state: String,
        country: String
    },
    fees: {
        type: Number,
        required: true,
    },
    languages: [String],
    uidai_details: {
        sequence: {
            type: Number,
            required: true
        },
        image: {
            type: String,
            required: true
        }
    },
    pan_details: {
        sequence: {
            type: Number,
            required: true
        },
        image: {
            type: String,
            required: true
        }
    },
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

    // account handling only for admin.
    verified: {
        type:Boolean,
        default:false
    },
    disabled: {
        type:Boolean,
        default:false
    },
});

module.exports = mongoose.model("Lawyer", lawyerSchema);