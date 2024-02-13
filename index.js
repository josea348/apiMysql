import express from 'express';
import bodyParser from 'body-parser';
import routerUsuario from './src/router/routerUsuario.js';

const servidor = express();

servidor.use(bodyParser.json());
servidor.use(bodyParser.urlencoded({extended: false}));
servidor.set('view engine', 'ejs');
servidor.set('views','./views');

servidor.use(express.static('./public'))

servidor.get('/documents',(req, res)=>{
    res.render('document.ejs');
});

servidor.use('/usuarios',routerUsuario);
servidor.listen(4001,()=>{
    console.log('servidor corriendo el el puerto 4001');
});