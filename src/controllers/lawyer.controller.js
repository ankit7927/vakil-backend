const lawyerService = require("../services/lawyer.service");


const lawyerController = {};

lawyerController.getAllLawyers = async (req, res, next) => {
    try {
        res.json(await lawyerService.getAllLawyers());
    } catch (error) {
        next(error)
    }
}

module.exports = lawyerController;