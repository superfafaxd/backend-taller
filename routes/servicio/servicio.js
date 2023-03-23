const { Router } = require('express')
const { check } = require('express-validator')
const { AgregarServicio, UpdateServicio, DeleteServicio, GetServicio } = require('../../controllers/servicio/servicio')
const { validarCampos } = require('../../middlewares/validar-campos')

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

router.delete('/deleteServicio/:serv_id', [], DeleteServicio)

router.get('/getServicio/:serv_id', [], GetServicio)

module.exports = router
