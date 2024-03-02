const { isValidObjectId } = require("mongoose");
const clientService = require("../services/clientService");

const clientController = {};

clientController.getAllClient = async (req, res, next) => {
    try {
        res.json(await clientService.getAllClient());
    } catch (error) {
        next(error);
    }
}

clientController.getClient = async (req, res, next) => {
    const clientId = req.params.clientId;
    if (!isValidObjectId(clientId))
        return res.status(404).json({ message: "its not an object id" });

    try {
        res.json(await clientService.getClient(clientId));
    } catch (error) {
        next(error);
    }
}

clientController.updateClientProfile = async (req, res, next) => {
    const clientId = req.params.clientId;
    const data = req.body;
    if (!isValidObjectId(clientId))
        return res.status(404).json({ message: "its not an object id" });

    try {
        res.json(await clientService.updateClientProfile(clientId, data));
    } catch (error) {
        next(error);
    }
}

clientController.getClientWallet = async (req, res, next) => {
    const clientId = req.params.clientId;
    
    if (!isValidObjectId(clientId))
        return res.status(404).json({ message: "its not an object id" });

    try {
        res.json(await clientService.getClientWallet(clientId));
    } catch (error) {
        next(error);
    }
}


module.exports = clientController;