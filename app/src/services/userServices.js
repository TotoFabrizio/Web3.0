const db = require("../database/models");
const bcrypt = require("bcryptjs")

const userServices = {
    createUser(payload) {
        db.User.create({
            ...payload,
            password: bcrypt.hashSync(payload.password,10),
        })
    },
    findUserByEmail(email) {
        const userFound = db.User.findOne({ where: { email: email } });
        return userFound;
    },
};

module.exports = userServices;
