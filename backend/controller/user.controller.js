const { User } = require('../model/user.model')
const { Op } = require('sequelize')
const { Service } = require('../model/service.model')

async function findAllUser(req, res, next) {
   const user = await User.findAll({ raw : true })
   res.send(user)
}

async function addUser(req, res, next){
   try {
      const username = req.body.username
      const password = req.body.password
      if(!username || !password) {
         res.status(400).send({
            message : 'Username atau password tidak boleh kosong'
         })
         return
      }
      await User.create({
         username : username,
         password : password
      })
         .then( res.send({
            message : 'Registrasi berhasil'
         }))
         .catch(err => {
            res.status(500).send({
               message : 'Internal server error'
            })
         })
   } catch(err){
      console.log(err)
      res.status(200).send({
         message : 'Internal server error'
      })
   }
}

async function getDetailUser(req,res,next) {
    const username = req.params.username
      const user = await User.findOne({
         where : {
            username : username
         },
         include : Service
      });

   try {
      if (user) {
         res.status(200).send({
            username : user.username,
            id : user.id,
            avatar : user.avatar,
            email : user.email,
            avatar : user.avatar,
            services : user.services
         })
      } else {
         res.status(404).send({
            message : 'user not found'
         })
      }
   } catch (err) {
      console.log(err)
      res.status(400).send({
         message : "Bad request"
      })
   }
}


async function updateUsername( req, res, next ) {
  try {
      const id = req.params.id
      const usernam = req.body.username
      await User.update({ username }, { where : { id : id } })
         .then(res.send({
            message : 'username berhasil dirubah'
         })
         ).catch(err => {
            console.log(err)
            res.status(500).send({
               message : 'Internal server error'
            })
         })
   } catch (err) {
      console.log(err)
      res.status(500).send({
         message : 'Internal server error'
      })
   }
}

async function updatePassword( req, res, next ) {
   try {
      const id = req.params.id
      const password = req.body.password
      await User.update({ password }, { where : { id : id } })
         .then(res.send({
            message : 'password berhasil dirubah'
         })
         ).catch(err => {
            console.log(err)
            res.status(500).send({
               message : 'Internal server error'
            })
         })
   } catch (err) {
      console.log(err)
      res.status(500).send({
         message : 'Internal server error'
      })
   }
}

async function deleteUser(req, res, next) {
   try {
      const id = req.params.id
      await User.destroy({ where : { id : id } })
   } catch (err) {
      res.send({
         message : err || 'internal server error'
      })
   }
}
module.exports = {
   findAllUser,
   addUser,
   getDetailUser,
   deleteUser,
   updateUsername,
   updatePassword
}
