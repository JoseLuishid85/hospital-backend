const fs = require('fs');

const Usuario  = require('../models/usuario');
const Medico   = require('../models/medico');
const Hospital = require('../models/hospital');

const borrarImagen = ( path ) => {

    if( fs.existsSync( path )){
        //Borrar la Imagen anterior
        fs.unlinkSync(path)
    }
}

const actualizarImagen = async(tipo, id, nombreArchivo) => {

    let pathViejo = "";
    switch(tipo){
        case 'medicos':
            const medico = await Medico.findById(id);
            if(!medico){
                console.log('No se un Medico por ID');
                return false;
            }

            pathViejo = `./uploads/medicos/${ medico.img }`;
            borrarImagen(pathViejo);

            medico.img = nombreArchivo;
            await medico.save();
            return true;

        break;
        
        case 'hospitales':
            const hospital = await Hospital.findById(id);
            if(!hospital){
                console.log('No se un hospital por ID');
                return false;
            }

            pathViejo = `./uploads/hospitales/${ hospital.img }`;
            borrarImagen(pathViejo);

            hospital.img = nombreArchivo;
            await hospital.save();
            return true;
        
        break;
        
        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if(!usuario){
                console.log('No se un Usuario por ID');
                return false;
            }

            pathViejo = `./uploads/usuarios/${ usuario.img }`;
            borrarImagen(pathViejo);

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;
        break;
    }


}



module.exports = {
    actualizarImagen
}