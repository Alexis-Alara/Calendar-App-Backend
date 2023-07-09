const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');



const newUser = async( req, res = response ) => {

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if( user ){
            return res.status(400).json({
                ok: false,
                msg: 'User already exists'
            });
        }

        user = new User( req.body );

        // Password encryption
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );

        await user.save();
        // JSON Web Token
        const token = await generateJWT( user.id, user.name )

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Please talk to an administrator'
        });   
    }
}

const loginUser = async( req, res = response ) => {

    const { email, password } = req.body;

    try {
        
        const user = await User.findOne({ email });

        if( !user ){
            return res.status(400).json({
                ok: false,
                msg: 'Invalid user and password'
            });
        }

        // Check passwords
        const validPassword = bcrypt.compareSync( password, user.password );

        if ( !validPassword ){
            return res.status(400).json({
                ok: false,
                msg: 'Invalid user and password'
            });
        }

        // JSON Web Token
        const token = await generateJWT( user.id, user.name )

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Please talk to an administrator'
        });   
    }
}

const renewToken = async( req, res = response ) => {

    const { uid, name } = req;
    // Renew JWT
    const token = await generateJWT( uid, name );

    res.json({
        ok: true,
        token
    })
}


module.exports = {
    newUser,
    loginUser,
    renewToken
}