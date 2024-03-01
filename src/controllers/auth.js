const client = require("../models/client")
const otpGenerator = require('otp-generator');
const otpModel = require("../models/otpModel");
const { genrateToken } = require("../utils/jwt");

const authController = {};

/**
 * this is a temp auth implimentations.
 * 
 * any user client or lawyer can login using only mobile otp
 * but lawyer registration will be complete followed.
 * 
 * client registration is such that during otp verification,
 * it will be checked that is client is registred or not.
 */
authController.login = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) 
        return res.status(404).json({ message: "add fileds are required" });
    const existing_client = await client.findOne({ email: email }).select("password").lean().exec();

    if (!existing_client) return res.status(404).json({ message: "client with email is not found" });

    console.log(existing_client);
    if (existing_client.password === password) {
        res.json({ token: genrateToken(existing_client._id) });
    } else res.status(400).json({ message: "wrong password" });
}

authController.register = async (req, res, next) => {
    const data = req.body;
    data.contact = 123456789;
    data.role = "client";
    const new_client = await client.create(data);
    if (new_client) {
        res.json({ token: genrateToken(new_client._id) });
    } else res.status(500).json({ message: "something went wrong" });
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