const jwt = require('jsonwebtoken');

const generateJWT = (  uid, name ) => {

    return new Promise (( resolve, reject ) => {

        const payload = { uid, name };
        jwt.sign( payload, "TH3-S3CR3T-W0RD-IS-TH3-ON3-Pl3C3", {
            expiresIn: '2h'
        }, ( error, token )=> {
            if ( error ){
                reject( 'JWT ERROR' );
            }
            resolve( token );
        })

    })

}

module.exports = {
    generateJWT
}