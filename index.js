require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { bdConnection } = require('./database/config');

//Crear el servidor de Express
const app = express();

//Configurar CORS
app.use(cors());

//Base de Datos
bdConnection();

//Rutas
app.get('/', (req,res) => {

    res.json({
        ok:true,
        msg: 'Hola Mundo'
    });
});

app.listen( process.env.PORT , () =>{
    console.log('Servidor Corriendo en puerto '+ process.env.PORT)
});