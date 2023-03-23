
import { response } from 'express';
import { pool } from '../database/dbconfig.js';


export const registroCliente = async (req, res = response) => {
    const { cli_id = null, nombre, domicilio = null, celular = null, nota = null, status } = req.body

    try {

        const sql = `INSERT INTO cliente (cli_id, nombre, domicilio, celular, nota, status) VALUES (${cli_id}, '${nombre}', '${domicilio}', '${celular}', '${nota}', ${status})`
        const results = await pool.query(sql)

        console.log('success!');
        return res.status(201).json({
            ok: true,
            results: results[0]
        })


    } catch (error) {
        res.status(500).json({
            error,
            msg: 'Error al registrar'
        })
    }
}

export const GetClientes = async (req, res = response) => {
    try {
        const { limite, limitePorPagina } = req.body
        console.log(limite, limitePorPagina)
        const amount = await pool.query('SELECT COUNT(*) AS amount FROM cliente WHERE status = true')

        const sql = `SELECT cli_id, nombre, domicilio, celular, nota, status FROM cliente WHERE status = 1 LIMIT ${limite}, ${limitePorPagina}`
        const results = await pool.query(sql)

        console.log('success!')
        return res.status(201).json({
            ok: true,
            amount: amount[0],
            results: results[0]
        })

    } catch (error) {
        res.status(500).json({
            error,
            msg: 'Error al obtener los datos!'
        })
    }

}
export const FiltroCliente = async (req, res = response) => {
    try {
        const filtro = req.params.filtro;
        const { limite, limitePorPagina } = req.body
        console.log({ limite, limitePorPagina })


        const sqlAmount = `SELECT COUNT(*) AS amount FROM cliente WHERE (nombre LIKE '%${filtro}%' OR cli_id LIKE '%${filtro}%') AND status = true`
        const amount = await pool.query(sqlAmount)

        const sql = `SELECT cli_id, nombre, domicilio, celular, nota, status FROM cliente WHERE (nombre LIKE '%${filtro}%' OR cli_id LIKE '%${filtro}%') AND status = true LIMIT ${limite}, ${limitePorPagina}`
        const results = await pool.query(sql)

        if (results[0].length === 0) {
            return res.json({
                ok: true,
                code: 4, //no hay resultados
                msg: "No resultset",
                amount: amount[0],
                results: results[0]
            })
        }

        console.log('success!')
        return res.status(201).json({
            ok: true,
            code: 3, //todo ok
            amount: amount[0],
            results: results[0]
        })

    } catch (error) {
        res.status(500).json({
            error,
            msg: 'Error al obtener los datos!'
        })
    }

}
export const GetClienteByID = async (req, res = response) => {
    try {
        const cli_id = req.params.cli_id;

        const sql = `SELECT cli_id, nombre, domicilio, celular, nota, status FROM cliente WHERE cli_id = '${cli_id}' AND status = 1`
        const results = await pool.query(sql)
        console.log('success!')
        return res.status(201).json({
            ok: true,
            results: results[0]
        })

    } catch (error) {
        res.status(500).json({
            error,
            msg: 'Error al obtener los datos!'
        })
    }

}

export const UpdateCliente = async (req, res = response) => {
    const { nombre, domicilio = null, celular = null, nota = null, status } = req.body
    const cli_id = req.params.cli_id;
    try {
        const sql = `UPDATE cliente SET nombre = '${nombre}', domicilio = '${domicilio}', celular = '${celular}', nota = '${nota}', status = ${status} WHERE cli_id = ${cli_id}`
        const results = await pool.query(sql)

        console.log('success!');
        return res.status(201).json({
            ok: true,
            results: results[0]
        })

    } catch (error) {
        res.status(500).json({
            error,
            msg: 'Error al actualizar'
        })
    }
}
export const UpdateStatusCliente = async (req, res = response) => {
    const { status } = req.body
    const cli_id = req.params.cli_id;
    try {

        const sql = `UPDATE cliente SET status = ${status} WHERE cli_id = ${cli_id}`
        const results = await pool.query(sql)

        console.log('success!');
        return res.status(201).json({
            ok: true,
            results
        })

    } catch (error) {
        res.status(500).json({
            error,
            msg: 'Error al registrar'
        })
    }
}
export const DeleteCliente = async (req, res = response) => {
    const cli_id = req.params.cli_id;
    try {//DELETE FROM cliente WHERE cli_id = 2"? DELETE FROM cliente WHERE `cliente`.`cli_id` = 2"?

        const sql = `DELETE FROM cliente WHERE cli_id = ${cli_id}`
        const results = await pool.query(sql)

        console.log('success!');
        return res.status(201).json({
            ok: true,
            results
        })

    } catch (error) {
        res.status(500).json({
            error,
            msg: 'Error al registrar'
        })
    }
}

