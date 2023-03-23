import { Router } from 'express';
import { check } from 'express-validator';
import { Empresa } from'../controllers/empresa.js';
import { validarCampos } from '../middlewares/validar-campos.js';

const router = Router();
//representante	taller_nom	pais	estado	municipio	domicilio	cp
router.post('/empresa',
    [
        check('representante', 'El representante es obligatorio').not().isEmpty(),
        check('taller_nom', 'El nombre de el taller es obligatorio').not().isEmpty(),
        check('pais', 'El pais es obligatorio').not().isEmpty(),
        check('estado', 'El estado es obligatorio').not().isEmpty(),
        check('municipio', 'El municipio es obligatorio').not().isEmpty(),
        check('domicilio', 'El domicilio es obligatorio').not().isEmpty(),
        check('cp', 'El Codigo postal es obligatorio').not().isEmpty(),
        validarCampos
    ],
    Empresa)

    export default router;
