const client = require("../models/client");

const clientService = {};

clientService.getAllClient = async () => {
    return await client.find()
        .select("name male image role").lean().exec();
}

clientService.getClient = async (clientId) => {
    return await client.findOne({ _id: clientId })
        .select("-password").lean().exec();
}

module.exports = clientService;