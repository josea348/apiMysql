import { check } from "express-validator";

export const validarUsuario = [
    check('nombres', 'El nombre es obligatorio o maximo 50 caracteres').not().isEmpty().isLength({max:50}),
    check('correo', 'correo invalido').isEmail()
];
