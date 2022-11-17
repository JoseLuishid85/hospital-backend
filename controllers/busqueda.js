const { response } = require('express');

const Usuario = require('../models/usuario');
const Hospital = require('../models/hospital');
const Medico = require('../models/medico');


const getTodo = async(req,res = response) => {

    const busqueda = req.params.busqueda;
    const regex = new RegExp( busqueda, 'i' )

    const [ usuarios, hospitales, medicos ] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Hospital.find({ nombre: regex }).populate('usuario','nombre'),
        Medico.find({ nombre: regex }).populate('usuario','nombre').populate('hospital','nombre'),
    ])

    res.json({
        ok:true,
        msg: 'getTodo',
        usuarios, hospitales, medicos
    });       
    
}

const getDocumentosColeccion = async(req,res = response) => {

    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex = new RegExp( busqueda, 'i' );

    let data = [];

    switch (tabla) {
        case 'medicos':
            data = await Medico.find({ nombre: regex })
                               .populate('usuario','nombre')
                               .populate('hospital','nombre');
            break; 
        
        case 'hospitales':
            data = await Hospital.find({ nombre: regex })
                                 .populate('usuario', 'nombre');
            break;
        
        case 'usuarios':
            data = await Usuario.find({ nombre: regex });
            break;
    
        default:
            res.status(400).json({
                ok:false,
                msg: 'La tabla tiene que ser usuarios/medicos/hospitales'
            });
            break;
    }

    res.json({
        ok:true,
        resultados: data
    });       
    
}



module.exports = {
    getTodo,
    getDocumentosColeccion
}