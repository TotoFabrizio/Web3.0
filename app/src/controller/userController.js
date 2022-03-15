const db = require("../database/models");
const userServices = require("../services/userServices");
const { validationResult } = require("express-validator");

const controller = {
    register: (req, res) => {
        res.render("register");
    },
    saveUser: async (req, res) => {
        let errors = validationResult(req);
        console.log(errors);
        console.log(req.body);
        console.log(await userServices.findUserByEmail(req.body.email))
        if (
            errors.isEmpty() &&
            await userServices.findUserByEmail(req.body.email) == null
        ) {
            userServices.createUser(req.body);
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
