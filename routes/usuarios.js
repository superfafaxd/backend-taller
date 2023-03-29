import { Router } from 'express';
import { check } from 'express-validator';
import {
    registroUsuarios,
    GetUsuarios,
    UserAuth,
    UpdateUser,
    UpdateStausUser,
    GetUsuariosByID,
    FiltroUsers
} from '../controllers/usuarios.js'
import { validarCampos } from '../middlewares/validar-campos.js';

const router = Router();
//user_id	nombre	user	pass	status
router.post('/registroUsuario',
    [
        check('nombre', 'El nombre es Obligatorio').not().isEmpty(),
        check('user', 'El Usuario es obligatorio').not().isEmpty(),
        check('pass', 'El password debe de tener al menos 3 caracteres').isLength({ min: 3 }),
        check('status', 'Status invalido').isBoolean(),
        validarCampos
    ],
    registroUsuarios)

router.post('/getUsers',
    [
        check('limite', 'el limite es obligatorio').not().isEmpty(),
        check('limitePorPagina', 'el limite PorPagina es obligatorio').not().isEmpty(),
        validarCampos
    ],
    GetUsuarios)

router.get('/getUserbyID/:user_id', [], GetUsuariosByID)

router.post('/FiltroUser/:filtro',
    [
        check('limite', 'el limite es obligatorio').not().isEmpty(),
        check('limitePorPagina', 'el limite PorPagina es obligatorio').not().isEmpty(),
        validarCampos
    ],
    FiltroUsers)

router.post('/login',
    [
        check('user', 'El usuario es obligatorio').not().isEmpty(),
        check('pass', 'la contraseña es obligatorio').not().isEmpty(),
        validarCampos
    ]
    , UserAuth)

router.put('/updateUser/:user_id',
    [
        check('nombre', 'El nombre es Obligatorio').not().isEmpty(),
        check('user', 'El Usuario es obligatorio').not().isEmpty(),
        check('pass', 'El password debe de tener al menos 3 caracteres').isLength({ min: 3 }),
        check('status', 'Status invalido').isBoolean(),
        validarCampos
    ]
    , UpdateUser)

router.put('/updateStatusUser/:user_id',
    [
        check('status', 'Status invalido').isBoolean(),
        validarCampos
    ]
    , UpdateStausUser)

export default router;
