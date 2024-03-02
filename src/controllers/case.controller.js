const { isValidObjectId } = require("mongoose");
const casesService = require("../services/case.service");

const caseController = {};

caseController.allCase = async (req, res, next) => {
    res.json(await casesService.getAllcases());
}

caseController.createCase = async (req, res, next) => {
    const data = req.body;
    try {
        res.json(await casesService.createCase(data))
    } catch (error) {
        next(error)
    }
}

caseController.updateCase = async (req, res, next) => {
    const data = req.body;
    const caseId = req.params.caseId;
    
    if (!isValidObjectId(caseId))
        return res.status(404).json({ message: "its not an object id" });

    try {
        await casesService.updateCase(caseId, data);
        res.json({ message: "Case updated" });
    } catch (error) {
        next(error)
    }
}

caseController.addSubCase = async (req, res, next) => {
    const data = { caseId, name, info } = req.body;
    if (!caseId || !name || !info)
        return res.status(404).json({ message: "all fields are required" });
    else if (!isValidObjectId(caseId))
        return res.status(404).json({ message: "its not an object id" });

    try {
        res.json(await casesService.addSubcases(caseId, data));
    } catch (error) {
        next(error)
    }
}

caseController.deleteSubCase = async (req, res) => {
    const { caseId, subcaseId } = req.body;

    if (!isValidObjectId(caseId) || !isValidObjectId(subcaseId))
        return res.status(404).json({ message: "its not an object id" });

    try {
        res.json(await casesService.deleteSubcases(caseId, subcaseId));
    } catch (error) {
        next(error)
    }
}

module.exports = caseController;