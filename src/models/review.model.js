const mongoose = require("mongoose")

const reviewSchema = mongoose.Schema({
    clientId: {
        type: String,
        unique: true
    },
    lawyerId: String,
    name: String,
    image: String,
    ratings: {
        type: Number,
        default: 0,
        enum: [0, 1, 2, 3, 4, 5]
    },
    comment: String
});

reviewSchema.post("save", (res)=>{
    console.log(res);
});

module.exports = mongoose.model("Review", reviewSchema);