const dbConfig = require('../config/db.config')
const Sequelize = require('sequelize')

const sequelize = new Sequelize(
   dbConfig.DB,
   dbConfig.USER,
   dbConfig.PASS,
   {
      host : dbConfig.HOST,
      dialect : dbConfig.dialect,
      operatorAliases : false,
      pool : {
         max : dbConfig.pool.max,
         acquire : dbConfig.pool.acquire,
         idle : dbConfig.pool.idle
      }
   }
)

module.exports = sequelize
