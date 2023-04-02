import { response } from 'express';
import { pool } from '../database/dbconfig.js';


export const Empresa = async (req, res = response) => {
    const { representante, taller_nom, pais, estado, municipio, domicilio, cp } = req.body
    try {
        //const sql = `UPDATE empresa SET representante = ?, taller_nom =?, pais=?, estado=?, municipio =?, domicilio = ?, cp = ?  VALUES ('${representante}', '${taller_nom}', '${pais}', '${estado}', '${municipio}', '${domicilio}', '${cp}')`;
        const sqlUpdate = `UPDATE empresa SET representante = '${representante}', taller_nom = '${taller_nom}', pais= '${pais}', estado = '${estado}', municipio = '${municipio}', domicilio = '${domicilio}', cp = '${cp}'`;
        const resultsUpdate = await pool.query(sqlUpdate)

        const sql = `SELECT representante, taller_nom, pais, estado, municipio, domicilio, cp FROM empresa`
        const results = await pool.query(sql)

        console.log('success!')
        return res.status(201).json({
            ok: true,
            msg: 'Datos actualizados correctamente',
            results: resultsUpdate[0],
            results: results[0]
        })
    } catch (error) {
        return res.status(500).json({
            msg: 'Error al Actualizar los datos',
            error
        })
    }

}

export const  GetEmpresa =  async (req, res = response) =>{
    try {
        const sql = `SELECT representante, taller_nom, pais, estado, municipio, domicilio, cp FROM empresa`
        const results = await pool.query(sql)
        console.log('success!')

        return res.status(201).json({
            ok: true,
            results: results[0]
        })
    } catch (error) {
       return res.status(500).json({
            msg: 'Error al obtener los datos',
            error
        })
    }
}


