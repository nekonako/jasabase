const user = require('./user.model')
const service = require('./service.model')

function syncAll(option){
   user.sync(option)
   service.sync(option)
   return
}

module.exports = syncAll
