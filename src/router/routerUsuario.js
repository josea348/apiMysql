import { Router } from "express";
import { listarUsuario , borrarUsuario, registrarUsuario, actualizarUsuario, buscarUsuario, editarUsuario } from "../controllers/controllerUsuario.js";
import { validarUsuario } from "../validate/usuarios.js";
const routerUsuario = Router();



routerUsuario.get('/listarUsuario', listarUsuario);
routerUsuario.post('/registrarUsuario',validarUsuario,registrarUsuario);
routerUsuario.delete('/borrarUsuario/:id', borrarUsuario);
routerUsuario.put('/actualizarUsuario/:id', actualizarUsuario);
routerUsuario.put('/editarUsuario/:id', editarUsuario);
routerUsuario.get('/buscarUsuario/:id', buscarUsuario);

export default routerUsuario;