import { response } from 'express';
import { pool } from '../../database/dbconfig.js'


export const AgregarServicio = async (req, res = response) => {
    try {
        //serv_id	auto_id	cli_id	motivo	total	fecha_ingreso	fecha_entrega	status
        const { serv_id = null, auto_id, cli_id, motivo, total = 0, fecha, fecha_ingreso, fecha_entrega = null, status } = req.body
        const sql = `INSERT INTO servicio (serv_id, auto_id, cli_id, motivo, total, fecha, fecha_ingreso, fecha_entrega, status) 
        VALUES (${serv_id}, '${auto_id}', '${cli_id}', '${motivo}', '${total}', '${fecha}', '${fecha_ingreso}', '${fecha_entrega}', ${status})`;
        const results = await pool.query(sql)
        console.log('success!')
        return res.status(201).json({
            ok: true,
            results: results[0]
        })

    } catch (error) {
        res.status(500).json({
            error,
            msg: 'Error al registrar'
        })
        throw error
    }
}

export const UpdateServicio = async (req, res = response) => {
    try {
        const serv_id = req.params.serv_id;
        const { motivo, total,  fecha_entrega, status } = req.body

        const sql = `UPDATE servicio SET motivo = '${motivo}', total = '${total}', fecha_entrega = '${fecha_entrega}', status = ${status} WHERE serv_id = '${serv_id}'`;
        const results = await pool.query(sql)

        console.log('success!')
        return res.status(201).json({
            ok: true,
            results: results[0]
        })
    } catch (error) {
        res.status(500).json({
            error,
            ok: false,
            msg: 'Error al registrar'
        })
        throw error
    }
}

export const CancelService = async (req, res = response) => {
    try {
        const { status } = req.body
        const serv_id = req.params.serv_id;
        // const sql = `DELETE FROM servicio WHERE serv_id = '${serv_id}'`;
        const sql = `UPDATE servicio SET status = ${status} WHERE serv_id = ${serv_id}`
        const results = await pool.query(sql)

        console.log('success!')
        return res.status(201).json({
            ok: true,
            results: results[0]
        })
    } catch (error) {
        res.status(500).json({
            error,
            msg: 'Error al registrar'
        })
        throw error
    }
}
export const GetServicioByID = async (req, res = response) => {
    try {
        const serv_id = req.params.serv_id;


        // const sql = `SELECT serv_id, auto_id, cli_id, motivo, total, 
        // date_format(fecha, "%Y-%m-%d") AS fecha,
        // date_format(fecha_ingreso, "%Y-%m-%d") AS fecha_ingreso,
        // date_format(fecha_entrega, "%Y-%m-%d") AS fecha_entrega, status FROM servicio WHERE serv_id = '${serv_id}'`;
        const sql = `
        SELECT serv.serv_id, serv.motivo, serv.total, 
        date_format(serv.fecha, "%Y-%m-%d") AS fecha,
        date_format(serv.fecha_ingreso, "%Y-%m-%d") AS fecha_ingreso,
        date_format(serv.fecha_entrega, "%Y-%m-%d") AS fecha_entrega, serv.status,
        serv.cli_id, c.nombre AS nameClient,
        serv.auto_id, CONCAT(a.marca," ", a.modelo," ", a.anio) AS auto
        FROM servicio serv
        INNER JOIN cliente c ON serv.cli_id = c.cli_id
        INNER JOIN auto a ON serv.auto_id = a.auto_id
        WHERE serv_id = '${serv_id}';
        `;
        const servicio = await pool.query(sql)

        if (servicio.length === 0) {
            return res.json({
                msg: `NO HAY RESULTADOS CON EL ID '${serv_id}'`
            })
        }
        const sqlDetServ = `SELECT det_id, descripcion, cantidad, precio, serv_id FROM detalle_serv WHERE serv_id = '${serv_id}'`
        const detallesServ = await pool.query(sqlDetServ)

        console.log('success!')
        return res.status(201).json({
            ok: true,
            servicio: servicio[0],
            detallesServ: detallesServ[0]
        })

    } catch (error) {
        res.status(500).json({
            error,
            msg: 'Error al registrar'
        })
        throw error
    }
}

export const GetServices = async (req, res = response) => {
    try {
        const { limite, limitePorPagina, startDate, endDate, statusFilter } = req.body
        // console.log({limite, limitePorPagina, startDate, endDate, statusFilter})

        if (statusFilter == '0') {
            console.log('todos los registros')
            var sqlFilterStatus = ``
        } else {
            sqlFilterStatus = `AND s.status = '${statusFilter}'`
        }

        const SQLamount = `SELECT COUNT(*) AS amount FROM servicio s WHERE s.fecha BETWEEN '${startDate}' AND '${endDate}' ${sqlFilterStatus}`
        const amount = await pool.query(SQLamount);

        const sql =
            `
        SELECT s. serv_id, s.motivo, s.total, date_format(s.fecha, "%Y-%m-%d") AS fecha,
        date_format(s.fecha_ingreso, "%Y-%m-%d") AS fecha_ingreso,
        date_format(s.fecha_entrega, "%Y-%m-%d") AS fecha_entrega,
        a.auto_id, CONCAT(a.marca," ", a.modelo," ", a.anio) AS auto,
        c.cli_id, CONCAT(c.cli_id, "-", c.nombre) AS cliente,
        s.status 
        FROM servicio s 
        INNER JOIN auto a ON a.auto_id = s.auto_id 
        iNNER JOIN cliente c ON c.cli_id = s.cli_id 
        WHERE s.fecha BETWEEN '${startDate}' AND '${endDate}' 
        ${sqlFilterStatus}
        LIMIT ${limite}, ${limitePorPagina};
        `
        const results = await pool.query(sql);
        console.log('success!')

        return res.status(201).json({
            ok: true,
            amount: amount[0],
            results: results[0]
        })

    } catch (error) {
        res.status(500).json({
            error,
            msg: 'Error al registrar'
        })
        throw error
    }
}



