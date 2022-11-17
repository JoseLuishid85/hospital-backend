const { response } = require('express');

const Medico = require('../models/medico');


const getMedicos = async(req,res = response) => {

    const medicos = await Medico.find()
                                .populate('usuario','nombre')
                                .populate('hospital','nombre');
    res.json({
        ok:true,
        medicos: medicos
    });

}

const crearMedico = async(req,res = response) => {

    const uid = req.uid;
    const medico = new Medico({  usuario: uid, ...req.body  });

    try {

        const medicoDB = await medico.save();

        res.json({
            ok:true,
            msg: medicoDB
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al procesar datos"
        })
    }
}

const actualizarMedico = async(req,res = response) => {

    res.json({
        ok:true,
        msg: 'actualizarMedico'
    });
}

const borrarMedico = async(req,res = response) => {

    res.json({
        ok:true,
        msg: 'borrarMedico'
    });
}


module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}