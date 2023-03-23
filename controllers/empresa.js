import { response } from 'express';
import { pool } from '../database/dbconfig.js';


export const Empresa = async (req, res = response) => {

    const { representante, taller_nom, pais, estado, municipio, domicilio, cp } = req.body
    try {
        //const sql = `UPDATE empresa SET representante = ?, taller_nom =?, pais=?, estado=?, municipio =?, domicilio = ?, cp = ?  VALUES ('${representante}', '${taller_nom}', '${pais}', '${estado}', '${municipio}', '${domicilio}', '${cp}')`;

        const sql = `UPDATE empresa SET representante = '${representante}', taller_nom = '${taller_nom}', pais= '${pais}', estado = '${estado}', municipio = '${municipio}', domicilio = '${domicilio}', cp = '${cp}'`;
        const results = await pool.query(sql)

        console.log('success!')
        return res.status(201).json({
            ok: true,
            results
        })
    } catch (error) {
        res.status(500).json({
            msg: 'Error al registrar',
            error
        })
    }

}


