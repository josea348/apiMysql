import express from 'express';
import bodyParser from 'body-parser';
import routerUsuario from './src/router/routerUsuario.js';
import autRouter from './src/router/router.autentication.js';
import rutaJuego from './src/router/router.juego.js';

const servidor = express();

servidor.use(bodyParser.json());
servidor.use(bodyParser.urlencoded({extended: false}));
servidor.set('view engine', 'ejs');
servidor.set('views','./views');

servidor.use(express.static('./public'))

servidor.get('/documents',(req, res)=>{
    res.render('document.ejs');
});

servidor.use('/usuarios', routerUsuario);
servidor.use('/juego',rutaJuego);
servidor.use(autRouter);
servidor.listen(4001,()=>{
    console.log('servidor corriendo en el puerto 4001');
});