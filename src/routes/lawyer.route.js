const lawyerController = require("../controllers/lawyer.controller");

const router = require("express").Router()

router.route("/lawyer")
    .get(lawyerController.getAllLawyers)

router.route("/lawyer/:lawyerId")
    .get(lawyerController.getLawyer)
    .put(lawyerController.updateLawyer)

module.exports = router;