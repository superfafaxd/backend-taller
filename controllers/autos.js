import { response } from 'express';
import { pool } from '../database/dbconfig.js';

export const registroAuto = async (req, res = response) => {
    //auto_id	cli_id	marca	modelo	anio	descripcion	status
    const { auto_id = null, cli_id, marca, modelo, anio, descripcion = '', nota = '', status } = req.body

    try {
        const sql = `INSERT INTO auto (auto_id, cli_id, marca, modelo, anio, descripcion, nota, status) VALUES 
            (${auto_id}, ${cli_id}, '${marca}', '${modelo}', '${anio}', '${descripcion}', '${nota}', ${status})`;
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
    }
}

export const UpdateAuto = async (req, res = response) => {
    //auto_id	cli_id	marca	modelo	anio	descripcion	status
    const auto_id = req.params.auto_id;
    const { cli_id, marca, modelo, anio, descripcion = '', nota = '', status } = req.body
    try {

        const sql = `UPDATE auto SET cli_id = '${cli_id}', marca = '${marca}', modelo = '${modelo}', anio = '${anio}', descripcion = '${descripcion}', nota = '${nota}', status = ${status} WHERE auto_id = ${auto_id}`;
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
    }


}

export const GetAutos = async (req, res = response) => {
    const { limite, limitePorPagina } = req.body
    try {
        const amount = await pool.query('SELECT COUNT(*) AS amount FROM auto WHERE status = true')

        const sql = `SELECT a.auto_id, a.cli_id, a.marca, a.modelo, a.anio, a.descripcion, a.nota, a.status, c.cli_id, c.nombre FROM auto a INNER JOIN cliente c ON a.cli_id = c.cli_id WHERE a.status = true LIMIT ${limite}, ${limitePorPagina}`
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

export const FiltroAuto = async (req, res = response) => {
    try {
        const filtro = req.params.filtro;
        const { limite, limitePorPagina } = req.body
        console.log({ limite, limitePorPagina })

        const sqlAmount = `SELECT COUNT(*) AS amount FROM auto a 
            INNER JOIN cliente c ON a.cli_id = c.cli_id WHERE (a.auto_id LIKE '%${filtro}%' OR c.nombre LIKE '%${filtro}%' OR c.cli_id LIKE '%${filtro}%') AND a.status = true`
        const amount = await pool.query(sqlAmount)

        const sql = `SELECT a.auto_id, a.cli_id, c.nombre, a.marca, a.modelo, a.anio, a.descripcion, a.nota, a.status FROM auto a 
                INNER JOIN cliente c ON a.cli_id = c.cli_id WHERE (a.auto_id LIKE '%${filtro}%' OR c.nombre LIKE '%${filtro}%' OR c.cli_id LIKE '%${filtro}%') 
                AND a.status = true LIMIT ${limite}, ${limitePorPagina}`
        const results = await pool.query(sql)

        if (results[0].length === 0) {
            return res.json({
                ok: true,
                code: 4, //no hay resultados
                msg: "No resultset",
                amount,
                results
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

export const GetAutoByID = async (req, res = response) => {
    try {
        let editAllData = true
        let msg = ''
        const auto_id = req.params.auto_id;

        const sql = `SELECT s.auto_id FROM servicio s WHERE s.auto_id = ${auto_id}`
        const verify = await pool.query(sql)

        if (verify[0].length > 0) {
            editAllData = false
            msg = 'No Se Pueden Editar Todos Los Datos de el Auto'
            // return res.json({
            //     ok: true,
            //     code: 2, //ya existe el auto en la tabla de servicios
            //     msg: 'No se puede Editar el Cliente al Auto',
            //     verify
            // })
        } else {
            msg = 'Se Pueden Editar Todos Los Datos de el Auto'
        }
        const sqlGetauto = `SELECT a.auto_id, a.marca, a.modelo, a.anio, a.descripcion, a.nota,a.cli_id, c.nombre AS cliente, a.status FROM auto a INNER JOIN cliente c ON a.cli_id = c.cli_id 
                WHERE a.auto_id = '${auto_id}' AND a.status = true;`;
        const results = await pool.query(sqlGetauto)

        if (results[0].length === 0) {
            return res.json({
                ok: true,
                code: 4, //no hay resultados
                msg: "No resultset",
                results
            })
        }

        console.log('success!')
        return res.status(201).json({
            editAllData,
            msg,
            //msg: 'No se puede Editar el Cliente al Auto',
            ok: true,
            code: 3,
            results: results[0]
        })


    } catch (error) {
        res.status(500).json({
            error, msg: 'Error al obtener los datos!'
        })
    }
}

export const DeleteteAuto = async (req, res = response) => {
    //auto_id	cli_id	marca	modelo	anio	descripcion	status
    try {
        const { status } = req.body
        const auto_id = req.params.auto_id;

        //const sql = `DELETE FROM auto WHERE auto_id = ${auto_id}`;
        const sql = `UPDATE auto SET status = ${status} WHERE auto_id = ${auto_id}`
        const results = await pool.query(sql)

        console.log('success!')
        return res.status(201).json({
            ok: true,
            msg: 'Auto Eliminado Correctamente',
            results: results[0]
        })

    } catch (error) {
        res.status(500).json({
            error,
            msg: 'Error al Borrar'
        })
    }
}
