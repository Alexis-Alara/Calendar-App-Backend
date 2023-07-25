const { response } = require('express');
const jwt = require('jsonwebtoken');

const JWTValidators = ( req, res, next ) => {
    // x-token headers
    const token = req.header('x-token');

    if( !token ){
        return res.status(401).json({
            ok: false,
            msg: 'Missing token'
        });
    }

    try {
        const { uid, name } =  jwt.verify(
            token,
            "TH3-S3CR3T-W0RD-IS-TH3-ON3-Pl3C3"
        );

        req.uid = uid;
        req.name = name;
        
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Invalid token'
        });
    }

    next();
}


module.exports = {
    JWTValidators
}