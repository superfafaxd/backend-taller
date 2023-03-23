const { response } = require('express')
const { connection } = require('../../database/dbconfig')


const AgregarServicio = async (req, res = response) => {

    try {
        //serv_id	auto_id	cli_id	motivo	total	fecha_ingreso	fecha_entrega	status
        const { serv_id = null, auto_id, cli_id, motivo, total = 0, fecha_ingreso, fecha_entrega = null, status } = req.body

        connection.beginTransaction((err) => {
            if (err) { throw err }
            const sql = `INSERT INTO servicio (serv_id, auto_id, cli_id, motivo, total, fecha_ingreso, fecha_entrega, status) VALUES (${serv_id}, '${auto_id}', '${cli_id}', '${motivo}', '${total}', '${fecha_ingreso}', '${fecha_entrega}', '${status}')`;
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

const UpdateServicio = async (req, res = response) => {
    try {
        const serv_id = req.params.serv_id;
        const { motivo, total, fecha_ingreso, fecha_entrega, status } = req.body
        connection.beginTransaction((err) => {
            if (err) { throw err }
            const sql = `UPDATE servicio SET motivo = '${motivo}', total = '${total}', fecha_ingreso = '${fecha_ingreso}', fecha_entrega = '${fecha_entrega}', status = '${status}' WHERE serv_id = '${serv_id}'`;
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

const DeleteServicio = async (req, res = response) => {
    try {
        const serv_id = req.params.serv_id;
        connection.beginTransaction((err) => {
            if (err) { throw err }
            const sql = `DELETE FROM servicio WHERE serv_id = '${serv_id}'`;
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
const GetServicio = async (req, res = response) => {
    try {
        const serv_id = req.params.serv_id;

        connection.beginTransaction((err) => {
            if (err) { throw err }
            const sql = `SELECT serv_id, auto_id, cli_id, motivo, total, fecha_ingreso, fecha_entrega, status FROM servicio WHERE serv_id = '${serv_id}'`;
            connection.query(sql, (error, servicio) => {
                if (error) {
                    return connection.rollback(() => {
                        res.status(400).json({
                            ok: false,
                            error
                        })
                        throw error
                    });
                }
                if (servicio.length === 0) {
                    return res.json({
                        msg: `NO HAY RESULTADOS CON EL ID '${serv_id}'`
                    })
                }
                const sqlDetServ = `SELECT det_id, detalle, cantidad, serv_id FROM detalle_serv WHERE serv_id = '${serv_id}'`
                connection.query(sqlDetServ, (error, detallesServ) => {
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
                            servicio,
                            detallesServ
                        })
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
    AgregarServicio,
    UpdateServicio,
    DeleteServicio,
    GetServicio,
}


