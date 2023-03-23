const { Router } = require('express')
const { check } = require('express-validator')
const { AgregarDetalleServ, UpdateDetalleServ, DeleteDetalleServ } = require('../../controllers/servicio/detalleServ')
const { validarCampos } = require('../../middlewares/validar-campos')

const router = Router();

router.post('/detalleServ',
[
    check('serv_id', 'ID del servicio invalido').isInt(),
    check('detalle', 'El detalle es obligorio').not().isEmpty(),
    check('cantidad', 'Cantidad obligatoria o en formato invalido').isFloat(),
    validarCampos
], AgregarDetalleServ)

router.put('/UpdateDetalleServ/:det_id',
[
    check('detalle', 'El detalle es obligorio').not().isEmpty(),
    check('cantidad', 'Cantidad obligatoria o en formato invalido').isFloat(),
    validarCampos
], UpdateDetalleServ)

router.delete('/deleteDetalleServ/:det_id', [], DeleteDetalleServ)

module.exports = router



