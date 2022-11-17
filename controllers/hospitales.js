const { response } = require('express');

const Hospital = require('../models/hospital');


const getHospitales = async(req,res = response) => {

    const hospitales = await Hospital.find()
                                     .populate('usuario','nombre email');
    res.json({
        ok:true,
        hospitales: hospitales
    });        

    
}

const crearHospital = async(req,res = response) => {

    const uid = req.uid;
    const hospital = new Hospital({  usuario: uid, ...req.body  });

    try {

        const hospitalDB = await hospital.save();
        
        res.json({
            ok:true,
            hospital: hospitalDB
        });

    } catch (error) {
        console.log(error)
        req.status(500).json({
            ok: false,
            msg: 'Error al procesar datos'
        })
    }


}

const actualizarHospital = async(req,res = response) => {

    res.json({
        ok:true,
        msg: 'actualizarHospital'
    });
}

const borrarHospital = async(req,res = response) => {

    res.json({
        ok:true,
        msg: 'borrarHospital'
    });
}


module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}