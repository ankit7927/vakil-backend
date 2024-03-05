const mongoose = require("mongoose");
const reviewModel = require("./review.model");

const lawyerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    birth_date: {
        type: Date,
        required: true
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
    qualifications: {
        type: [String],
        required: true
    },
    specializations: {
        categories: {
            type: [String],
            required: true
        },
        subcategories: {
            type: [String],
            required: true
        },
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
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    },
    followers: {
        type: Number,
        default: 0
    },
    ratings: {
        type: Number,
        default: 0
    },
    reviews: [{
        clientId: {
            type: String,
            unique: true
        },
        name: String,
        image: String,
        ratings: {
            type: Number,
            default: 0,
            enum: [0, 1, 2, 3, 4, 5]
        },
        comment: String
    }],
    // password for testing pourpse
    password: String,
});

lawyerSchema.methods.addReviewAndUpdate = async function (newReview) {

    this.reviews.push(newReview);
    const totalRatings = this.reviews.reduce((acc, review) => acc + review.ratings, 0);
    const newRating = totalRatings / this.reviews.length;
    this.ratings = newRating;

    await this.save();
}

lawyerSchema.methods.removeReviewAndUpdate = async function (reviewId) {
    const index = this.reviews.findIndex(re => re._id === reviewId);
    console.log(index);
    if (index !== -1) {
        this.reviews.splice(index, 1);

        const totalRatings = this.reviews.reduce((acc, review) => acc + review.ratings, 0);

        const newRating = this.reviews.length > 0
            ? totalRatings / this.reviews.length
            : 0;

        this.ratings = newRating;
        await this.save();
    }
}
module.exports = mongoose.model("Lawyer", lawyerSchema);