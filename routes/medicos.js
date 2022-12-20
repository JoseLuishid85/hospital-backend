/*
    Medicos
    Rutas: /api/medicos
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { getMedicos, getMedicoById, crearMedico, actualizarMedico, borrarMedico } = require('../controllers/medicos');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


router.get('/',validarJWT, getMedicos );

router.post('/', 
        [
                validarJWT,
                check('nombre','El nombre del Medico es obligatorio').not().isEmpty(),
                check('hospital','El hospital id debe ser valido').isMongoId(),
                validarCampos
        ] ,
        crearMedico
);

router.put('/:id',
        [
                validarJWT,
                check('nombre','El nombre del Medico es obligatorio').not().isEmpty(),
                check('hospital','El hospital id debe ser valido').isMongoId(),
                validarCampos
        ], 
        actualizarMedico
);

router.delete('/:id', validarJWT,borrarMedico  );

router.get('/:id', validarJWT,getMedicoById  );

module.exports = router;
