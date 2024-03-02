const clientController = require("../controllers/client");

const router = require("express").Router();

router.route("/client")
    .get(clientController.getAllClient)

router.route("/client/:clientId")
    .get(clientController.getClient)
    .put(clientController.updateClientProfile)

module.exports = router;