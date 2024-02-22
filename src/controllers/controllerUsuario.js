import { pool } from "../database/conexion.js";
import { validationResult } from "express-validator";

export const listarUsuario= async (req,res) => {
    try {
        const [result] = await pool.query('select * from usuarios');
        /* res.status(200).json(result); */
        if(result.length > 0) {
            res.status(200).json(result);
        }else{
            res.status(404).json(result[0]);
        }
    } catch (e) {
        console.log('Error del sistema'+e);
        res.status(500).json({'status':500,'message':'Error: '+e});
    }
}

export const registrarUsuario= async (req,res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json(errors);
        }

        const {nombre,direccion,telefono,correo,rol} = req.body;
        let sql = `insert into usuarios(nombres,direccion,telefono,correo,rol) values (?,?,?,?,?)`;
        const [rows] = await pool.query(sql,[nombre,direccion,telefono,correo,rol]);
        if (rows.affectedRows>0) {
            res.status(200).json({'status':200,'message':'Se registro con exito el usuario...!!!'});
        }else{
            res.status(403).json({'status':403,'message':'No se registro el usuario...!!!'});
        }
    } catch (e) {
        res.status(500).json({'status':500,'message':'Error: '+e});
    }
}

export const borrarUsuario= async (req,res) => {
    try {
        const idUsuario = req.params.id;
        const [result] = await pool.query('delete from usuarios where idusuario=?', [idUsuario]);
        if(result.affectedRows>0) {
            res.status(200).json({'status':200,'message':'Se elemino el usuario'});
        }else{
            res.status(403).json({'status':403,'message':'No se elemino el usuario'});
        }
    } catch (error) {
        res.status(500).json({'status':500,'message':'Error'+error.message});
    }
}

export const actualizarUsuario= async (req,res) => {
    try {
        const { id } = req.params;
        const {nombre, direccion, telefono, correo, rol} = req.body;
        const [result] = await pool.query('update usuarios set nombres = ?, direccion = ?, telefono = ?, correo = ?, rol = ? where idusuario = ?',[nombre, direccion, telefono, correo, rol, id]);
        /* res.status(200).json(result); */
        if(result.affectedRows > 0) {
            res.status(200).json({'status': 200, 'message': `Usuario con ID ${id} fue actualizado correctamente.`});
        }else{
            res.status(404).json({'status': 404, message:`'No se encontro nimgún usuario con ese ID ${id}`});
        }
    } catch (e) {
        console.log('Error del sistema'+e);
        res.status(500).json({'status': 500, message: 'Error del servidor al intentar editar el usuario.'+e});
    }
}

export const editarUsuario= async (req,res) => {
    try {
        const { id } = req.params;
        const {nombre, direccion, telegono, correo, rol} = req.body;
        const [result] = await pool.query('update usuarios set nombres = ?, direccion = ?, telefono = ?, correo = ?, rol = ? where idusuario = ?',[nombre, direccion, telegono, correo, rol, id]);
        /* res.status(200).json(result); */
        if(result.affectedRows > 0) {
            res.status(200).json({'status': 200, 'message': `Usuario con ID ${id} fue editado correctamente.`});
        }else{
            res.status(404).json({'status': 404, message:`'No se encontro nimgún usuario con ese ID ${id}`});
        }
    } catch (e) {
        console.log('Error del sistema'+e);
        res.status(500).json({'status': 500, message: 'Error del servidor al intentar editar el usuario.'+e});
    }
}

export const buscarUsuario= async (req,res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query('select * from usuarios where idusuario = ?',[id]);
        /* res.status(200).json(result); */
        if(result.length > 0) {
            res.status(200).json(result[0]);
        }else{
            res.status(404).json({'status': 404, message:`No se encontro nimgún usuario con ese ID ${id}`});
        }
    } catch (e) {
        console.log('Error del sistema'+e);
        res.status(500).json({'status': 500, message: 'Error del servidor al intentar buscar el usuario.'+e});
    }
}