import { Router } from "express";
import { cargarImagen, guardarJuego } from "../controllers/Juego.controller.js";
const rutaJuego = Router();

rutaJuego.post('/guardar',cargarImagen,guardarJuego);

export default rutaJuego;
