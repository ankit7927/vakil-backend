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

caseController.deleteCase = async (req, res, next) => {
    const caseId = req.params.caseId;

    if (!isValidObjectId(caseId))
        return res.status(404).json({ message: "its not an object id" });

    try {
        res.json(await casesService.deleteCase(caseId));
    } catch (error) {
        next(error)
    }
}

caseController.addSubCase = async (req, res, next) => {
    const { caseId, subcases } = req.body;
    if (!caseId)
        return res.status(404).json({ message: "case id is required" });
    else if (!isValidObjectId(caseId))
        return res.status(404).json({ message: "its not an object id" });

    try {
        res.json(casesService.addSubcases(caseId, subcases));
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