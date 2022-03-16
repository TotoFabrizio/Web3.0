const db = require("../database/models");
const userServices = require("../services/userServices");
const { validationResult } = require("express-validator");

const controller = {
    register: (req, res) => {
        res.render("register");
    },
    updateUser: async (req, res) => {
        let errors = validationResult(req);
        console.log(req.body)
        if (
            errors.isEmpty() &&
            await userServices.findUserByEmail(req.body.email) == null
        ) {
            userServices.updateData(req.body,req.body.ethAddress);
            res.redirect("/");
        } else {
            if (await userServices.findUserByEmail(req.body.email) != null) {
                let error = {
                    msg: "El mail ya es usado por otro usuario",
                };
                errors.errors.push(error);
            }
            res.render("register", {
                errors: errors.errors,
            });
        }
    },
    login: (req,res) =>{
        res.render("login")
    }
};

module.exports = controller;
