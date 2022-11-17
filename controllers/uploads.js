const path = require('path');
const fs = require('fs');

const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require("../helpers/actualizar-img");


const fileUpload = (req, res = response) => {
    
    const tipo = req.params.tipo;
    const id   = req.params.id;

    const tiposValidos = ['hospitales','medicos','usuarios'];
    if( !tiposValidos.includes(tipo) ){
        return res.status(400).json({
            ok: false,
            msg: 'No se un medico, usuario u hospital'
        })
    }

    //Validamos que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningun archivo'
        });
    }

    //Procesar la Imagen
    const file = req.files.imagen;

    const nombreCortado = file.name.split('.'); 
    const extensionArchivo = nombreCortado[ nombreCortado.length -1 ];

    //Validar Extension
    const extensionesValida = ['png','jpg','jpeg','gif'];
    if( !extensionesValida.includes(extensionArchivo) ){
        return res.status(400).json({
            ok: false,
            msg: 'No es una Imagen'
        });
    }

    //Generar el Nombre del archivo
    //uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
    const nombreArchivo = `${ uuidv4() }.${ extensionArchivo }`;

    //Path para guardar la imagen
    const path = `./uploads/${ tipo }/${nombreArchivo}`;

    //Mover la Imagen 
    file.mv(path, (err) =>{
        if (err){
            console.log(err)
            return res.status(500).json({
                ok: false,
                msg: 'Error al Mover la Image'
            });
        }

        //Actualizar Base de Datos
        actualizarImagen(tipo, id, nombreArchivo);
    
        res.json({
            ok: true,
            msg: 'File uploaded!'
        });
    });
    

}

const retornaImagen = (req, res = response) => {

    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join( __dirname, `../uploads/${ tipo }/${ foto }` );
    //Imagen por Defecto
    if( fs.existsSync(pathImg) ){
        res.sendFile( pathImg );
    }else{
        const pathImg = path.join( __dirname, `../uploads/no-imagen.jpg` );
        res.sendFile( pathImg );
    }

}

module.exports = {
    fileUpload,
    retornaImagen
}