const jwt = require('jsonwebtoken')
const secretKey = require('../config/auth.config')

async function authToken( req, res, next ) {
    const token = req.headers.cookie
    console.log(token)
    if ( token == null ) {
        return res.send({
            error : 1,
            message : 'token kosong'
        })
    }
    await jwt.verify(token, secretKey, (err, decoded) => {
        if(err){
            return res.send({
                error : 1,
                message : 'Token invalid'
            })
        } else {
            return res.send({
                error : 0,
                message : 'OK'
            })
        }
    })
}

module.exports = authToken
