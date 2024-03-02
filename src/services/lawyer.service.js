const lawyerModel = require("../models/lawyer.model");
const errorGen = require("../utils/errorGen");

const lawyerService = {};

lawyerService.getAllLawyers = async () => {
    return await lawyerModel.find()
        .select("name email verified disabled gender image").lean();
}

lawyerService.getLawyer = async (lawyerId) => {
    const lawyer = await lawyerModel.findOne({ _id: lawyerId })
        .select("-password").lean().exec()

    if (!lawyer) errorGen("lawyer not found", 404);
    return lawyer;
}

lawyerService.updateLawyer = async (lawyerId, data) => {
    const update = await lawyerModel.findOneAndUpdate({ _id: lawyerId },
        { "$set": data });

    if (!update) errorGen("failed to updated lawyer data", 404);
    else return { message: "lawyer updated" };
}

lawyerService.getWallet = async (lawyerId) => {
    const lawyer = await lawyerModel.findOne({ _id: lawyerId })
        .select("wallet").lean().exec()

    if (!lawyer) errorGen("lawyer not found", 404);
    return lawyer;
}
module.exports = lawyerService;