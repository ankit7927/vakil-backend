const client = require("../models/client.model");
const lawyerModel = require("../models/lawyer.model");
const errorGen = require("../utils/errorGen");
const { genrateToken } = require("../utils/jwt");

const authService = {};

authService.login = async (email, password) => {
    const existing_client = await client.findOne({ email: email })
        .select("password").lean().exec();

    if (!existing_client) errorGen("client with email is not found", 404);

    if (existing_client.password === password) {
        return { token: genrateToken(existing_client._id) }
    } else errorGen("wrong password", 404);
}


authService.register = async (data) => {
    data.role = "client";
    const new_client = await client.create(data);
    if (new_client) {
        return { token: genrateToken(new_client._id) };
    } else errorGen("something went wrong");
}


authService.registerLawyer = async (data) => {
    data.role = "lawyer";
    const newLawyer = await lawyerModel.create(data);
    if (newLawyer) {
        return { message: "account created and waiting for verification." };
    } else errorGen("something went wrong");
}


module.exports = authService;