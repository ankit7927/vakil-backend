const lawyerModel = require("../models/lawyer.model");

const lawyerService = {};

lawyerService.getAllLawyers = async () => {
    return await lawyerModel.find()
        .select("name email verified disabled gender image").lean();
}

module.exports = lawyerService;