const authController = require("../controllers/auth.controller");

const router = require("express").Router();

router.post("/send-otp", authController.sendOtp);
router.post("/verify-otp", authController.verifyOtp);

router.post("/login", authController.login);
router.post("/register", authController.register);

module.exports = router;