const clientController = require("../controllers/client.controller");

const router = require("express").Router();

router.route("/client")
    .get(clientController.getAllClient)

router.route("/client/:clientId")
    .get(clientController.getClient)
    .put(clientController.updateClientProfile)

router.route("/wallet/:clientId")
    .get(clientController.getClientWallet)
module.exports = router;