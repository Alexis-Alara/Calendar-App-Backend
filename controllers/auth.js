const { response } = require('express');

const newUser = ( req, res = response ) => {

    const { name, email, password } = req.body

    if( name.length < 5 ){
        return res.status(400).json({
            ok: false,
            msg: 'The name mush have at least 5 letters'
        })
    }

    res.json({
        ok: true,
        msg: 'register',
        name,
        email,
        password
    })
}

const loginUser = ( req, res = response ) => {

    const { name, email, password } = req.body

    res.json({
        ok: true,
        msg: 'login',
        email,
        password
    })
}

const renewToken = ( req, res = response ) => {
    res.json({
        ok: true,
        msg: 'renew'
    })
}


module.exports = {
    newUser,
    loginUser,
    renewToken
}