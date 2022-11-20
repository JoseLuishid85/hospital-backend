const { response } = require('express');

const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

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

    const id  = req.params.id;
    const idhospital = req.body.hospital;
    const uid = req.uid;

  
    try {

        const medico = await Medico.findById(id);
        if(!medico){
            return res.status(404).json({
                ok: false,
                msg: 'Medico no existe en la base de datos'
            });
      }

        //Validar si el Hospital existe la base de datos
        const hospital = await Hospital.findById(idhospital);
        if(!hospital){
            return res.status(404).json({
                ok: false,
                msg: 'Hospital no existe en la base de datos',
            });
        }

        const cambiosMedico = {
            ...req.body,
            usuario:uid
        } 

        const medicoActualizado = await Medico.findByIdAndUpdate(id,cambiosMedico,{ new:true });

        res.json({
            ok: true,
            msg: medicoActualizado,
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al Procesar datos"
        });
    }
}

const borrarMedico = async(req,res = response) => {

    const id  = req.params.id;

  
    try {

        const medico = await Medico.findById(id);
        if(!medico){
            return res.status(404).json({
                ok: false,
                msg: 'Medico no existe en la base de datos'
            });
        }

        const medicoActualizado = await Medico.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: "El medico fue borrado con Exito",
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al Procesar datos"
        });
    }
}


module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}