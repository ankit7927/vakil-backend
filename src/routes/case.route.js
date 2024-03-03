const caseController = require("../controllers/case.controller");

const router = require("express").Router();

router.route("/case")
    .get(caseController.allCase)
    .post(caseController.createCase)

router.route("/case/:caseId")
    .put(caseController.updateCase)
    .delete(caseController.deleteCase)

router.route("/subcase")
    .post(caseController.addSubCase)
    .delete(caseController.deleteSubCase)

module.exports = router;