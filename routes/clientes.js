import { Router } from 'express';
import { check } from 'express-validator';
import {
   registroCliente,
   UpdateCliente,
   UpdateStatusCliente,
   DeleteCliente,
   GetClientes,
   GetClienteByID,
   FiltroCliente
} from '../controllers/clientes.js';
import { validarCampos } from '../middlewares/validar-campos.js';

const router = Router();
//cli_id	nombre	domicilio	status
router.post('/registroCliente',
   [
      check('nombre', 'El campo nombre es obligatorio').not().isEmpty(),
      check('nombre', 'El nombre debe de tener al menos 4 caracteres').isLength({ min: 4 }),
      check('status', 'status no valido').isBoolean(),
      validarCampos
   ],
   registroCliente);

router.post('/getClientes',
   [
      check('limite', 'el limite es obligatorio').not().isEmpty(),
      check('limitePorPagina', 'el limite PorPagina es obligatorio').not().isEmpty(),
      validarCampos
   ],
   GetClientes)

router.get('/getClientesById/:cli_id', GetClienteByID)

router.post('/FiltroClientes/:filtro',
[
   check('limite', 'el limite es obligatorio').not().isEmpty(),
   check('limitePorPagina', 'el limite PorPagina es obligatorio').not().isEmpty(),
   validarCampos
],
   FiltroCliente)


router.put('/updateCliente/:cli_id',
   [
      check('nombre', 'El campo nombre es obligatorio').not().isEmpty(),
      check('nombre', 'El nombre debe de tener al menos 4 caracteres').isLength({ min: 4 }),
      check('status', 'status no valido').isBoolean(),
      validarCampos
   ],
   UpdateCliente);

router.put('/UpdateStatusCliente/:cli_id',
   [
      check('status', 'status no valido').isBoolean(),
      validarCampos
   ],
   UpdateStatusCliente);

router.delete('/deleteCliente/:cli_id', DeleteCliente)

//module.exports = router;
export default router;
