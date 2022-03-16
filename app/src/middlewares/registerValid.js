const { check } = require("express-validator");

let validateRegister = [
    check("email")
        .notEmpty().withMessage("Debes completar el email").bail()
        .isEmail().withMessage("Debes completar con un email válido"),
    check("username")
        .notEmpty().withMessage("Debes completar el nombre de usuario").bail()
];

module.exports = validateRegister;