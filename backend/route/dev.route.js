const user = require('../controller/user.controller')
const service = require('../controller/service.controller')
const loginUser = require('../controller/login.controller')
const registrasiUser = require('../controller/registrasi.controller')
const router = require('express').Router()
const isExist = require('../util/check-user.util')

module.exports = app => {

   router.get('/users', user.findAllUser)
   router.post('/users', isExist, user.addUser)
   router.get('/users/:id', user.getDetailUser)
   router.delete('/users/:id', user.deleteUser)
   router.put('/users/username/:id', isExist, user.updateUsername)
   router.put('/users/password/:id', user.updatePassword)

   router.get('/services', service.findAllService)
   router.post('/services/:id', service.addService)
   router.get('/service/:id', service.getDetailService)
   router.put('/services/:id', service.updateService)
   router.delete('/services/:id', service.deleteService)

   router.get('/', service.findAllService)
   router.post('/login', loginUser)
   router.post('/daftar', registrasiUser)

   app.use('/api/dev/', router)
}

