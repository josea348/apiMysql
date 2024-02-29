import { pool } from "../database/conexion.js";
import Jwt from "jsonwebtoken";

export const validarUser = async (req,res) => {
    try {
        let { login, password } = req.body;
        let sql = `select idusuario,nombres,rol from usuarios where correo='${login}' and password='${password}'`;
        const [rows] = await pool.query(sql);
        if (rows.length > 0) {
            let token = Jwt.sign({ rows }, process.env.AUT_SECRET, { expiresIn: process.env.AUT_EXPIRE });
            return res.status(200).json({'user':rows,'token':token,'message': 'Usuario autorizado.'});
        } else {
            return res.status(404).json({ "message": "usuario no autorizado" });
        }
    } catch (e) {
        res.status(500).json({ 'message': e.message });
    }
}

export const validarToken = async (req, res,next) => {
    let token_cliente = req.headers['token'];
    if (!token_cliente) {
        return res.status(404).json({'message': 'Se requiere el token.'})
    } else {
        const token = Jwt.verify(token_cliente, process.env.AUT_SECRET, (error, decoded) => {
            if (error) {
                return res.status(404).json({ 'message': 'Token incorrecto' });
            } else {
                next();
            }
        })
    }
}