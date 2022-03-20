const userServices = require("../../services/userServices");
const { validationResult } = require("express-validator");

module.exports = {
    createUser: async(req,res)=>{
        if(await userServices.findUserByWallet(req.body.walletaddress) != null){
            res.redirect("/")
            return
        }
        const result = await userServices.createUser(req.body);
        res.redirect("/users/register")
    },
    findUserByWallet: async(req,res)=>{
        const user = await userServices.findUserByWallet(req.params.ethAddress)
        res.send(user)
    },
    updateUser: async (req, res) => {
        let errors = validationResult(req);
        console.log(req.body)
        if (
            errors.isEmpty() &&
            await userServices.findUserByEmail(req.body.email) == null
        ) {
            userServices.updateData(req.body,req.body.walletaddress);
            res.json({});
        } else {
            if (await userServices.findUserByEmail(req.body.email) != null) {
                let error = {
                    msg: "El mail ya es usado por otro usuario",
                };
                errors.errors.push(error);
            }
            res.send({
                errors: errors.errors,
            });
        }
    },
}