import { pool } from "../database/conexion.js";
import multer from "multer";

const storage = multer.diskStorage(
    {
        destination: function(req,img,cb){
            cb(null,"public/img");
        },
        filename: function(req,img,cb){
            cb(null,img.originalname);
        }
    }
);

const upload=multer({storage:storage});
export const cargarImagen=upload.single('img');

export const guardarJuego = async (req,res) => {
    try {
        const {nombre,descripcion,precio} = req.body;
        let imagen = req.file.orinalname;
        let sql = `insert into juegos (nombre,descripcion,imagen,precio) values ('${nombre}', '${descripcion}', '${imagen}', '${precio}')`;
        const [result] = await pool.query(sql);
        if (result.affectedRows>0) {
            res.status(200).json({'message': 'Se registro el juego'});
        } else {
            res.status(404).json({'message': 'No se registro el juego'});
        }
    } catch (e) {
        res.status(500).json({'message': 'Error. '+e});
    }
}