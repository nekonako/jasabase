const user = require('../controller/user.controller')
const service = require('../controller/service.controller')
const router = require('express').Router()
const isExist = require('../util/check-user.util')
const authUser = require('../midleware/auth')

module.exports = app => {
   
   router.put('/username/:id', authUser, isExist, user.updateUsername)
   router.put('/password/:id', authUser, user.updatePassword)

   router.post('/service', authUser, service.addService) 
   router.put('/service', authUser, service.updateService)
   router.delete('/service/:id', authUser, service.deleteService)

   app.use('/api/users', router)
}

