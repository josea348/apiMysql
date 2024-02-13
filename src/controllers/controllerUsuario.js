import { pool } from "../database/conexion.js";

export const listarUsuario= async (req,res) => {
    try {
        const [result] = await pool.query('select * from usuarios');
        res.status(200).json(result);
        /* if(result.affectedRows > 0) {
            res.status(200).json(result[0]);
        }else{
            res.status(404).json(result[0]);
        } */
    } catch (e) {
        console.log('Error del sistema'+e);
    }
}