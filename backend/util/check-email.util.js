const { User } = require('../model/user.model')

async function isValidEmail(req, res, next) {
   const email = req.body.email
   await User.findAll({ where : { email : email } })
      .then( data => {
         console.log(data[0])
         if ( data[0] != null ) {
            res.status(400).send({
               error : 1,
               statusCode : 400,
               status : 'Bad request',
               message : 'Email sudah digunakan'
            })
            return
         } else {
            next()
         }
      })
}

module.exports = isValidEmail
