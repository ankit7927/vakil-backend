const { isValidObjectId } = require("mongoose");
const lawyerService = require("../services/lawyer.service");


const lawyerController = {};

lawyerController.getAllLawyers = async (req, res, next) => {
    try {
        res.json(await lawyerService.getAllLawyers());
    } catch (error) {
        next(error)
    }
}

lawyerController.getLawyer = async (req, res, next) => {
    const lawyerId = req.params.lawyerId;
    if (!isValidObjectId(lawyerId))
        return res.status(404).json({ message: "its not an object id" });
    try {
        res.json(await lawyerService.getLawyer(lawyerId));
    } catch (error) {
        next(error)
    }
}

lawyerController.updateLawyer = async (req, res, next) => {
    const lawyerId = req.params.lawyerId;
    const data = req.body;

    if (!isValidObjectId(lawyerId))
        return res.status(404).json({ message: "its not an object id" });

    try {
        res.json(await lawyerService.updateLawyer(lawyerId, data));
    } catch (error) {
        next(error)
    }
}

lawyerController.getWallet = async (req, res, next) => {
    const lawyerId = req.params.lawyerId;

    if (!isValidObjectId(lawyerId))
        return res.status(404).json({ message: "its not an object id" });

    try {
        res.json(await lawyerService.getWallet(lawyerId));
    } catch (error) {
        next(error)
    }
}


module.exports = lawyerController;