const { response } = require('express')
const { connection } = require('../../database/dbconfig')

const AgregarDetalleServ = async (req, res = response) =>{
    try {
        const { det_id = null, descripcion, cantidad, serv_id  } = req.body
        connection.beginTransaction((err) => {
            if (err) { throw err }
            const sql = `INSERT INTO detalle_serv (det_id, descripcion, cantidad, serv_id) VALUES ('${det_id}', '${descripcion}', '${cantidad}', '${serv_id}')`;
            connection.query(sql, (error, results) => {
                if (error) {
                    return connection.rollback(() => {
                        res.status(400).json({
                            ok: false,
                            error
                        })
                        throw error
                    });
                }
                connection.commit((err) => {
                    if (err) {
                        return connection.rollback(() => {
                            res.status(400).json({
                                ok: false,
                                err
                            })
                            throw err
                        });
                    }
                    console.log('success!')
                    return res.status(201).json({
                        ok: true,
                        results
                    })


                })
            });
        })
    } catch (error) {
        res.status(500).json({
            error,
            msg: 'Error al registrar'
        })
        throw error
    }
}

const UpdateDetalleServ = async (req, res = response) =>{
    try {
        const det_id = req.params.det_id;
        const {  descripcion, cantidad  } = req.body

               connection.beginTransaction((err) => {
            if (err) { throw err }
            const sql = `UPDATE detalle_serv SET descripcion = '${descripcion}', cantidad = '${cantidad}' WHERE det_id = '${det_id}'`;
            connection.query(sql, (error, results) => {
                if (error) {
                    return connection.rollback(() => {
                        res.status(400).json({
                            ok: false,
                            error
                        })
                        throw error
                    });
                }
                connection.commit((err) => {
                    if (err) {
                        return connection.rollback(() => {
                            res.status(400).json({
                                ok: false,
                                err
                            })
                            throw err
                        });
                    }
                    console.log('success!')
                    return res.status(201).json({
                        ok: true,
                        results
                    })


                })
            });
        })
    } catch (error) {
        res.status(500).json({
            error,
            msg: 'Error al registrar'
        })
        throw error
    }
}

const DeleteDetalleServ = async (req, res = response) =>{
    try {
        const det_id = req.params.det_id;

        connection.beginTransaction((err) => {
            if (err) { throw err }
            const sql = `DELETE FROM detalle_serv WHERE det_id = '${det_id}'`;
            connection.query(sql, (error, results) => {
                if (error) {
                    return connection.rollback(() => {
                        res.status(400).json({
                            ok: false,
                            error
                        })
                        throw error
                    });
                }
                connection.commit((err) => {
                    if (err) {
                        return connection.rollback(() => {
                            res.status(400).json({
                                ok: false,
                                err
                            })
                            throw err
                        });
                    }
                    console.log('success!')
                    return res.status(201).json({
                        ok: true,
                        results
                    })


                })
            });
        })
    } catch (error) {
        res.status(500).json({
            error,
            msg: 'Error al registrar'
        })
        throw error
    }
}

module.exports = {
    AgregarDetalleServ,
    UpdateDetalleServ,
    DeleteDetalleServ,
}
