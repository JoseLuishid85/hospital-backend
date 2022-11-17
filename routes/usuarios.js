/*
    Usuarios
    Rutas: /api/usuarios
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


router.get('/', validarJWT ,getUsuarios );
router.post('/', [
            check('nombre','El Nombre es Obligatorio').not().isEmpty(),
            check('password','La Clave es Obligatorio').not().isEmpty(),
            check('email','El Correo es Obligatorio').isEmail(),
            validarCampos
        ] ,
        crearUsuario
);

router.put('/:id',[
            validarJWT,
            check('nombre','El Nombre es Obligatorio').not().isEmpty(),
            check('email','El Correo es Obligatorio').isEmail(),
            check('role','El Role es Obligatorio').not().isEmpty(),
            validarCampos
        ], 
        actualizarUsuario
);

router.delete('/:id',validarJWT, borrarUsuario  );

module.exports = router;
