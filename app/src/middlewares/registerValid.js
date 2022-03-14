const { check } = require("express-validator");

let validateRegister = [
    check("email")
        .notEmpty().withMessage("Debes completar el email").bail()
        .isEmail().withMessage("Debes completar con un email válido"),
    check("password")
        .notEmpty().withMessage("Debes completar la contraseña").bail()
        .isStrongPassword().withMessage("La contraseña debe tener como minimo 8 caracteres, una mayuscula, un numero y un caracter especial")
        .custom((value, { req }) => {
            if (value !== req.body.confirmPassword) {
                throw new Error("Las contraseñas no coinciden");
            }
            return true;
        }),
    check("confirmPassword")
        .notEmpty().withMessage("Debes completar la confitmación de contraseña").bail(),
];

module.exports = validateRegister;