const lawyerController = require("../controllers/lawyer.controller");

const router = require("express").Router()

router.route("/lawyer")
    .get(lawyerController.getAllLawyers)

module.exports = router;