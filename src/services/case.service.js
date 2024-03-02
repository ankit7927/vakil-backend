const caseModel = require("../models/case.model");
const cases = require("../models/case.model");
const errorGen = require("../utils/errorGen");

const casesService = {};

casesService.getAllcases = async () => {
    return await caseModel.find().lean();
}

casesService.createCase = async (data) => {
    const newcases = await caseModel.create(data);
    if (newcases) return newcases;
    else errorGen("something went wrong");
}

casesService.updateCase = async (caseId, data) => {
    const existing = await caseModel.findById({ _id: caseId });
    if (!existing) errorGen("cases not found", 404);
    existing.name = data.name;
    await existing.save();
}

casesService.addSubcases = async (caseId, data) => {
    const existingCase = await caseModel.findOneAndUpdate({ _id: caseId },
        { "$push": { subCases: { name: data.name, info: data.info } } });

    if (existingCase) return { message: "subcases added" };
    else errorGen("something went wrong");
}

casesService.deleteSubcases = async (caseId, subCaseId) => {
    const existingCase = await caseModel.findOneAndUpdate({ _id: caseId },
        { "$pull": { subCases: { _id: subCaseId } } });

    if (existingCase) return { message: "subcase removed" };
    else errorGen("something went wrong");

}
module.exports = casesService;