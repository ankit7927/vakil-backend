const client = require("../models/client.model");
const errorGen = require("../utils/errorGen");

const clientService = {};

clientService.getAllClient = async () => {
    return await client.find()
        .select("name male image role").lean().exec();
}

clientService.getClient = async (clientId) => {
    return await client.findOne({ _id: clientId })
        .select("-password").lean().exec();
}

clientService.updateClientProfile = async (clientId, data) => {
    const updated = await client.findOneAndUpdate({ _id: clientId },
        { "$set": data });

    if (updated) return { message: "client profile update" };
    else errorGen("wrong data provided", 500);
}

clientService.getClientWallet = async (clientId) => {
    const existingClient = await client.findById({ _id: clientId })
        .select("wallet").lean().exec();

    if (!existingClient) errorGen("client not found", 404);
    console.log(existingClient);
    return existingClient;
}

module.exports = clientService;