import { validarUser } from "../controllers/autentication.js";
import { Router } from "express"; 

const autRouter = Router();

autRouter.post('/validar', validarUser);

export default autRouter;