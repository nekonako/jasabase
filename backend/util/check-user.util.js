const { User } = require('../model/user.model')

async function isValidUsername(req, res, next) {
   const username = req.body.username
   await User.findAll({ where : { username : username } })
      .then( data => {
         console.log(data[0])
         if ( data[0] != null ) {
            res.status(400).send({
               error : 1,
               statusCode : 400,
               status : 'Bad request',
               message : 'Username sudah digunakan'
            })
            return
         } else {
            next()
         }
      })
}

module.exports = isValidUsername
