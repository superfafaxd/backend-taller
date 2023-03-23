import { Router } from 'express';
import { check } from 'express-validator';
import { 
    registroAuto,
    UpdateAuto,
    DeleteteAuto,
    GetAutos,
    GetAutoByID,
    FiltroAuto
} from '../controllers/autos.js';

import { validarCampos } from '../middlewares/validar-campos.js';

const router = Router();

router.post('/getAutos', [], GetAutos)

router.post('/FiltroAutos/:filtro', [], FiltroAuto)

router.get('/getAutoByID/:auto_id', GetAutoByID)

router.post('/registroAuto',
    [
        check('cli_id', 'ID invalido').isInt(),
        check('marca', 'La marca es obligatoria').not().isEmpty(),
        check('modelo', 'El modelo es obligatorio').not().isEmpty(),
        check('anio', 'El año es obligatorio').not().isEmpty(),
        check('status', 'status invalido').isBoolean(),
        validarCampos
    ], registroAuto);

router.put('/updateAuto/:auto_id',//cli_id, marca, modelo, anio, descripcion, status
    [
        check('cli_id', 'cli_id no valido, debe de ser numero entero').isInt(),
        check('marca', 'La marca es obligatoria').not().isEmpty(),
        check('modelo', 'El modelo es obligatorio').not().isEmpty(),
        check('anio', 'El año es obligatorio').not().isEmpty(),
        check('status', 'status invalido').isBoolean(),
        validarCampos
    ], UpdateAuto)

router.put('/deleteAuto/:auto_id', [], DeleteteAuto)



export default router;
