const { findAllService,getDetailService } = require('../controller/service.controller')
const { getDetailUser } = require('../controller/user.controller')
const loginUser = require('../controller/login.controller')
const registrasiUser = require('../controller/registrasi.controller')
const router = require('express').Router()
const isValidUsername = require('../util/check-user.util') 
const isValidEmail = require('../util/check-email.util')
const authToken = require('../controller/auth.controller')

module.exports = app => {
   router.get('/services', findAllService)
   router.get('/services/:serviceId', getDetailService)
   router.get('/users/:username', getDetailUser)
   router.post('/login', loginUser)
   router.post('/daftar',isValidEmail, isValidUsername, registrasiUser)
   router.post('/check-username', isValidUsername, (req, res) => {
      res.status(200).send({
         message : 'OK'
      })
   })
    router.post('/check-email', isValidEmail, (req, res) => {
      res.status(200).send({
         message : 'OK'
      })
   })
   router.get('/auth-token', authToken )
   app.use('/api', router)
}
