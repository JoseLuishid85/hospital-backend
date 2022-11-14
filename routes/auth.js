/*
    Path: '/api/login' 
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();


router.post('/',[
    check('email','El email es Obligatorio').isEmail(),
    check('password','La password es Obligatoria').not().isEmpty(),
    validarCampos
],login)



module.exports = router;