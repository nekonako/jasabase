const jwt = require('jsonwebtoken')
const secretKey = require('../config/auth.config')

async function authUser( req, res, next ) {
   const token = req.headers.authorization
   console.log(token)
   if ( token == null ) {
      return res.send({
         error : 1,
         message : 'token kosong'
      })
   }
   await jwt.verify(token, secretKey, (err, decodes) => {
      if(err){
         console.log(err)
         return res.send({
            error : 1,
            message : 'Token invalid'
         })
      } else {
         console.log(decodes)
         next()
      }
   })
}

module.exports = authUser
