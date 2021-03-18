const { User } = require('../model/user.model')
const bcrypt = require('bcrypt')

async function registrasiUser( req, res, next ) {
   try {
      const { username,password,email } = req.body
      let encryptPass = await bcrypt.hash(password, 10)
      await User.create({
         username : username,
         password : encryptPass,
         email : email
      })
         .then( res.status(201).send({
            error : 0,
            statusCode : 201,
            status : 'OK',
            message : 'Registrasi berhasil'
         }))
         .catch(err => {
            console.log(err)
            res.status(500).send({
               message : err.message || 'Internal server error'
            })
         })
   } catch(err){
      console.log(err)
      res.status(500).send({
         message : 'Internal server error'
      })
   }
}

module.exports = registrasiUser
