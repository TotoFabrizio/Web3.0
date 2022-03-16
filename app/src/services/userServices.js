const db = require("../database/models");

const userServices = {
    createUser(payload) {
        db.User.create({
            ...payload,
        });
    },
    async findUserByWallet(wallet) {
        const userFound = await db.User.findOne({ where: { walletaddress: wallet } });
        return userFound;
    },
    updateData(data, walletaddress) {
        db.User.update(
            { email: data.email, username: data.username },
            { where: { walletaddress: walletaddress } }
        );
    },
    async findUserByEmail(email) {
        const userFound = await db.User.findOne({ where: { email: email } });
        return userFound;
    },
};

module.exports = userServices;
