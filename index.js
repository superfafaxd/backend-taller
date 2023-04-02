import express from 'express';
import clientesRoutes from './routes/clientes.js';
import autosRoutes from './routes/autos.js';
import usersRoutes from './routes/usuarios.js';
import empresaRoutes from './routes/empresa.js';
import servicioRoutes from './routes/servicio/servicio.js';
import { PORT } from './middlewares/config.js';
//const {connection} = require('./database/dbconfig');
import cors from 'cors';

//crear servidor de express
const app = express();
//CORS
app.use(cors());

app.use(express.json());

//Rutas
app.use('/api/clientes', clientesRoutes)
app.use('/api/auto', autosRoutes)
app.use('/api/usuarios', usersRoutes)
app.use('/api/empresa', empresaRoutes)
 app.use('/api/servicio', servicioRoutes)
// app.use('/api/detalleServ', require('./routes/servicio/detalleServ'))

// app.use((req, res, next) =>{
//     res.status(404).json({
//         msg: 'ENDPOINT NOT FOUND'
//     })
// })
app.get('*', (req, res) => {
    res.status(404).json({
        msg: 'ENDPOINT NOT FOUND'
    })
})

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`)
})