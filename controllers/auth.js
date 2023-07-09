const { response } = require('express');

const newUser = ( req, res = response ) => (
    res.json({
        ok: true,
        msg: 'register'
    })
)

const loginUser = ( req, res ) => (
    res.json({
        ok: true,
        msg: 'login'
    })
)

const renewToken = ( req, res ) => (
    res.json({
        ok: true,
        msg: 'renew'
    })
)


module.exports = {
    newUser,
    loginUser,
    renewToken
}