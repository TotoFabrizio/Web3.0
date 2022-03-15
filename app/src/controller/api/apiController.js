const userServices = require("../../services/userServices");

module.exports = {
    createUser: async(req,res)=>{
        if(await userServices.findUserByWallet(req.body.walletaddress) != null){
            res.redirect("/")
            return
        }
        const result = await userServices.createUser(req.body);
        res.redirect("/users/register")
    }
}