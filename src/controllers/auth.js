const client = require("../models/client")
const otpGenerator = require('otp-generator');
const otpModel = require("../models/otpModel");

const authController = {};

authController.login = async (req, res, next) => {
    const email = req.body.email;
    if (!email) return res.status(401).json({ message: "email required" });

}

authController.register = async () => {

}

authController.sendOtp = async (req, res, next) => {
    const email = req.body.email;
    try {
        let otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
        let result = await otpModel.findOne({ otp: otp });
        while (result) {
            otp = otpGenerator.generate(6, { upperCaseAlphabets: false });
            result = await OTP.findOne({ otp: otp });
        }

        const rx = await otpModel.create({ email, otp });
        console.log(rx);
        res.json({ message: `otp sent on ${email}` });
    } catch (err) {
        next(err)
    }
}

authController.verifyOtp = async (req, res, next) => {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(403).json({ message: 'All fields are required', });

    try {
        const response = await otpModel.find({ email }).sort({ createdAt: -1 }).limit(1).lean();
        if (response && otp === response[0].otp) {
            console.log("otp verified");
            // redirect to login
        } else res.status(404).json({ message: "wrong otp" })
    } catch (err) {
        next(err)
    }
}

module.exports = authController;