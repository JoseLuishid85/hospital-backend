/*
    Path: '/api/login' 
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn, remewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


router.post('/',[
        check('email','El email es Obligatorio').isEmail(),
        check('password','La password es Obligatoria').not().isEmpty(),
        validarCampos
    ],
    login
)

router.post('/google',[
        check('token','La token es Obligatoria').not().isEmpty(),
        validarCampos
    ],
    googleSignIn
)

router.get('/renew',
    validarJWT,
    remewToken
)



module.exports = router;