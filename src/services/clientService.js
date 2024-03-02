const client = require("../models/client");
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
    const existingClient = await client.findById({ _id: clientId });

    if (!existingClient) errorGen("client not found", 404);

    existingClient.name = data.name || existingClient.name;
    existingClient.email = data.email || existingClient.email;
    existingClient.martial_status = data.martial_status || existingClient.martial_status;
    existingClient.work_status = data.work_status || existingClient.work_status;
    existingClient.disabled = data.disabled || existingClient.disabled;
    existingClient.contact = data.contact || existingClient.contact;
    // TODO update client image

    const update = await existingClient.save();
    if (update) return { message: "client profile update" };
    else errorGen("wrong data provided", 500);
}

module.exports = clientService;