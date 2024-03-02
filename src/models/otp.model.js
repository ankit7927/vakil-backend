const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 5, // The document will be automatically deleted after 5 minutes of its creation time
    },
});


otpSchema.pre("save", async (next) => {
    if (this.isNew) {
        try {
            const mailResponse = await mailSender(
                this.email,
                "Verification Email",
                `<h1>Please confirm your OTP</h1>
           <p>Here is your OTP code: ${this.otp}</p>`);
            console.log(mailResponse);
        } catch (error) {
            throw error;
        }
    }
    next();
});
module.exports = mongoose.model("OTP", otpSchema);
