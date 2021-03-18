const sequelize = require('../db/init.db')
const {DataTypes} = require('sequelize')
const {Service} = require('./service.model')

const User = sequelize.define('users', {
   username : {
      type : DataTypes.STRING,
      allowNull : false
   },
   email : {
      type: DataTypes.STRING,
      allowNull : false
   },
   password : {
      type : DataTypes.STRING,
      allowNull : false
   },
   avatar : {
      type : DataTypes.STRING,
      defaultValue : '',
      allowNull : true
   },
   premium : {
      type : DataTypes.BOOLEAN,
      defaultValue : false
   }
})

User.hasMany(Service, {
   foreignKey : {
      allowNull : false
   }
})
Service.belongsTo(User)

const sync = (option) => {
   User.sync(option).then(() => {
      console.log('tabel user created')
   })
}

module.exports = {
   User,
   sync
}
