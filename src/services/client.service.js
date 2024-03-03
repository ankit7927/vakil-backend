const clientModel = require("../models/client.model");
const lawyerModel = require("../models/lawyer.model");
const errorGen = require("../utils/errorGen");

const clientService = {};

clientService.getAllClient = async () => {
    return await clientModel.find()
        .select("name male image role").lean().exec();
}

clientService.getClient = async (clientId) => {
    return await clientModel.findOne({ _id: clientId })
        .select("-password").lean().exec();
}

clientService.updateClientProfile = async (clientId, data) => {
    const updated = await clientModel.findOneAndUpdate({ _id: clientId },
        { "$set": data });

    if (updated) return { message: "client profile update" };
    else errorGen("wrong data provided", 500);
}

clientService.getClientWallet = async (clientId) => {
    const existingClient = await clientModel.findById({ _id: clientId })
        .select("wallet").lean().exec();

    if (!existingClient) errorGen("client not found", 404);
    console.log(existingClient);
    return existingClient;
}

clientService.toggleFollow = async (clientId, lawyerId) => {
    const dx = await clientModel.findById({ _id: clientId })
        .select("followed_lawyers").exec();

    const cx = dx.followed_lawyers.indexOf(lawyerId);
    if (cx != -1) {
        await clientModel.findOneAndUpdate({ _id: clientId },
            { "$pull": { followed_lawyers: lawyerId } });

        await lawyerModel.findOneAndUpdate({ _id: lawyerId },
            { "$inc": { followers: -1 } })
    } else {
        await clientModel.findOneAndUpdate({ _id: clientId },
            { "$push": { followed_lawyers: lawyerId } });

        await lawyerModel.findOneAndUpdate({ _id: lawyerId },
            { "$inc": { followers: 1 } })
    }

    return { message: "followed toggled" };
}

module.exports = clientService;