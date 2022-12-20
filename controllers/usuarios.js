const { responde } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');


const getUsuarios = async(req,res) => {
    
    const desde = Number(req.query.desde) || 0;

    const [usuarios, total] = await Promise.all([
        Usuario
                .find( {},'nombre email role google img' )
                .skip(desde )
                .limit( 5 ),
        Usuario.countDocuments()
    ]);
    
    res.json({
        ok:true,
        usuarios,
        uid: req.uid,
        total: total
    });
}

const crearUsuario = async(req,res = responde) => {

    const  { password, email } = req.body;

    try {

        const existeEmail = await Usuario.findOne({ email });

        if( existeEmail ){
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya existe en la base de datos'
            })
        }

        const usuario = new Usuario(req.body);

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password,salt);

        //Guardar Usuario
        await usuario.save();

        //Generar el Token - JWT
        const token = await generarJWT(usuario.id);

        res.json({
            ok:true,
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...  Revisar Logs'
        })
    }

}

const actualizarUsuario = async(req,res = responde) => {

    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(uid);

        if( !usuarioDB ){
            return res.status(404).json({
                ok:false,
                msg: 'No existe un usuario por ese ID'
            })
        }

        //Actualizaciones
        const { password, google, email, ...campos } = req.body;

        if( usuarioDB.email !== email ){

            const existeEmail = await Usuario.findOne({ email });
            if(existeEmail){
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                });
            }

        }

        if(!usuarioDB.google){
            campos.email = email;
        }else if(usuarioDB.email !== email){
            return res.status(400).json({
                ok: false,
                msg: 'Usuario de google no pueden cambiar su correo'
            });
        }

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new:true });


        res.json({
            ok:true,
            usuario: usuarioActualizado
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error Inesperado'
        })
    }

}

const borrarUsuario = async(req,res = responde) => {
    
    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(uid);

        if( !usuarioDB ){
            return res.status(404).json({
                ok:false,
                msg: 'No existe un usuario por ese ID'
            })
        }

        await Usuario.findByIdAndDelete(uid);

        res.json({
            ok:true,
            msg: 'Usuario Eliminado con Exito'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error'
        });
    }
}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}