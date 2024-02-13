import { Router } from "express";
import { listarUsuario } from "../controllers/controllerUsuario.js";
const routerUsuario = Router();

routerUsuario.get('/listarUsuario', listarUsuario);

export default routerUsuario;