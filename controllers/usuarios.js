import { response } from 'express';
import { pool } from '../database/dbconfig.js';
import CryptoJS from 'crypto-js';

export const registroUsuarios = async (req, res = response) => {
    const { user_id = null, nombre, user, pass, status } = req.body;

    var passEncript = CryptoJS.AES.encrypt(pass, '@borjascript').toString();
    try {
        const userExist = await pool.query(`SELECT user_id, nombre, user, pass, status FROM usuario WHERE user = '${user}'`)

        if (userExist[0].length > 0) {
            let status
            userExist[0].forEach(e => {
                status = e.status
            });

            if (status) {
                return res.json({
                    ok: true,
                    code: 1, //usuario no disponible
                    msg: "Usuario no disponible",
                    userExist: userExist[0]
                })
            } else {
                return res.json({
                    ok: true,
                    code: 2, //ya existe el usuario
                    msg: "Existe un usuario eliminado con ese nombre de usuario",
                    userExist: userExist[0],
                    status
                })
            }
        }
        const sql = `INSERT INTO usuario (user_id, nombre, user, pass, status) VALUES (${user_id}, '${nombre}', '${user}', '${passEncript}', ${status})`
        const results = await pool.query(sql)

        console.log('success!')
        return res.status(201).json({
            ok: true,
            code: 3,
            results
        })

    } catch (error) {
        res.status(500).json({
            error,
            msg: 'Error al registrar'
        })
    }
}

export const GetUsuarios = async (req, res = response) => {
    try {
        const { limite, limitePorPagina } = req.body
        const sqlCount = 'SELECT COUNT(*) AS amount FROM usuario WHERE status = true'
        const amount = await pool.query(sqlCount)

        const sql = `SELECT user_id, nombre, user, pass FROM usuario WHERE status = 1 LIMIT ${limite}, ${limitePorPagina}`
        const results = await pool.query(sql)
        console.log('success!')
        return res.status(201).json({
            ok: true,
            results: results[0],
            amount: amount[0]
        })
    } catch (error) {
        res.status(500).json({
            error,
            msg: 'Error al obtener los datos!'
        })
    }

}

export const GetUsuariosByID = async (req, res = response) => {
    try {
        const user_id = req.params.user_id;

        const sql = `SELECT user_id, nombre, user, pass, status FROM usuario WHERE user_id = ${user_id}`
        const results = await pool.query(sql)

        console.log('success!')

        return res.status(201).json({
            ok: true,
            results: results[0],

        })
    } catch (error) {
        res.status(500).json({
            error,
            msg: 'Error al obtener los datos!'
        })
    }
}

export const FiltroUsers = async (req, res = response) => {
    try {
        const filtro = req.params.filtro;
        const { limite, limitePorPagina } = req.body
        const sqlCount = `SELECT COUNT(*) AS amount FROM usuario WHERE (nombre LIKE '%${filtro}%' OR user_id LIKE '%${filtro}%') AND status = true`
        const amount = await pool.query(sqlCount)

        const sql = `SELECT user_id, nombre, user, pass, status FROM usuario WHERE (nombre LIKE '%${filtro}%' OR user_id LIKE '%${filtro}%') AND status = true
        LIMIT ${limite}, ${limitePorPagina}`
        const results = await pool.query(sql)

        if (results[0].length === 0) {
            return res.json({
                ok: true,
                code: 4, //no hay resultados
                msg: "No resultset",
                results: results[0]
            })
        }
        console.log('success!')
        return res.status(201).json({
            ok: true,
            code: 3, //todo ok
            results: results[0],
            amount: amount[0]
        })
    } catch (error) {
        res.status(500).json({
            error,
            msg: 'Error al obtener los datos!'
        })
    }

}

export const UserAuth = async (req, res = response) => {
    const { user, pass } = req.body
    let nombreDB
    let userDB
    let passDB
    try {
        const sql = `SELECT nombre, user, pass FROM usuario WHERE user = '${user}' AND status = 1`
        const results = await pool.query(sql)

        if (results[0].length === 0) {
            return res.status(200).json({
                ok: false,
                msg: "Usuario o Contraseña incorrecto"
            })
        }
        // const validarPass = bcrypt.compareSync(pass, results[0].pass);
        // if (!validarPass) {
        //     return res.status(200).json({
        //         ok: false,
        //         msg: "Usuario o Contraseña incorrecto"
        //     })
        // }
        results[0].forEach(e => {
            nombreDB = e.nombre
            userDB = e.user
            passDB = e.pass
        });
        var bytes = CryptoJS.AES.decrypt(passDB, '@borjascript');
        var passDescrypt = bytes.toString(CryptoJS.enc.Utf8);

        if (passDescrypt != pass) {
            return res.status(201).json({
                ok: false,
                msg: "Usuario o Contraseña incorrecto"
            })
        }
        console.log('login success!')
        return res.status(201).json({
            ok: true,
            //validarPass,
            msg: "login correct!",
            nombre: nombreDB,
            user: userDB,
            // results: results[0]
        })
    } catch (error) {
        res.status(500).json({
            error,
            msg: 'Error al ingresar'
        })
    }
}

export const UpdateUser = async (req, res = response) => {
    try {
        const user_id = req.params.user_id;
        const { nombre, user, pass, status } = req.body;

        // const salt = bcrypt.genSaltSync();
        // const passEncript = bcrypt.hashSync(pass, salt)
        var passEncript = CryptoJS.AES.encrypt(pass, '@borjascript').toString();

        const sql = `UPDATE usuario SET nombre = '${nombre}', user = '${user}', pass = '${passEncript}', status = ${status} WHERE user_id = '${user_id}'`;
        const results = await pool.query(sql)
        console.log('success!')
        return res.status(201).json({
            ok: true,
            msg: 'Usuario actualizado',
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

export const UpdateStausUser = async (req, res = response) => {
    try {
        const user_id = req.params.user_id;
        const { status } = req.body;

        const sql = `UPDATE usuario SET status = ${status} WHERE user_id = '${user_id}'`;
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
