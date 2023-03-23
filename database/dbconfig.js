import {createPool} from 'mysql2/promise';
import { HOST, USER, PASSWORD, MYSQLPORT, DB } from '../middlewares/config.js';
export const pool = createPool({
    host: HOST,
    user: USER,
    password: PASSWORD,
    port: MYSQLPORT,
    database: DB 
})
// const connection = mysql.createConnection({
//     host: process.env.HOST,
//     user: process.env.USER,
//     password: process.env.PASSWORD,
//     port: process.env.MYSQLPORT,
//     database: process.env.DB
// });

// connection.connect(error => {
//     if (error)
//         throw new Error(`Error al conectar con la DB: ${error}`)
//     console.log(`DB ONLINE IN: ${process.env.HOSTCONNECTED}`)
// })


// module.exports = {
//     connection,
// }
