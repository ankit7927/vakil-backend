const caseController = require("../controllers/case.controller");

const router = require("express").Router();

router.route("/case")
    .get(caseController.allCase)
    .post(caseController.createCase)

router.route("/case/:caseId")
    .put(caseController.updateCase)

router.route("/subcase")
    .post(caseController.addSubCase)
    .delete(caseController.deleteSubCase)

module.exports = router;