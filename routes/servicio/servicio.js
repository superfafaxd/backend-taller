import { Router } from 'express';
import { check } from 'express-validator';
import {
    AgregarServicio,
    UpdateServicio,
    CancelService,
    GetServicioByID,
    GetServices,
} from '../../controllers/servicio/servicio.js'
import { validarCampos } from '../../middlewares/validar-campos.js'

const router = Router()
//serv_id	auto_id	cli_id	motivo	total	fecha_ingreso	fecha_entrega	status	
router.post('/agregarServicio',
    [
        check('auto_id', 'ID de auto invalido').isInt(),
        check('cli_id', 'ID de el cliente invalido').isInt(),
        check('motivo', 'El motivo del servicio es obligatorio').not().isEmpty(),
        check('fecha_ingreso', 'Fecha de ingreso es obligatorio o esta en formato incorrecto (aa-mm-dd)').isDate(),
        check('status', 'El status es obligatorio').not().isEmpty(),

        validarCampos
    ], AgregarServicio)

router.put('/updateServicio/:serv_id',
    [
        check('motivo', 'El motivo del servicio es obligatorio').not().isEmpty(),
        check('total', 'El Total del servicio es obligatorio').not().isEmpty(),
        check('fecha_ingreso', 'Fecha de ingreso es obligatorio o esta en formato incorrecto (aa-mm-dd)').isDate(),
        check('fecha_entrega', 'Fecha de entrega es obligatorio o esta en formato incorrecto (aa-mm-dd)').isDate(),
        check('status', 'El status es obligatorio').not().isEmpty(),

        validarCampos
    ], UpdateServicio)

router.post('/deleteServicio/:serv_id', [], CancelService)

router.get('/getServicio/:serv_id', [], GetServicioByID)

router.post('/getServices', [], GetServices)

export default router;
