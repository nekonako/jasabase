const sequelize = require('../db/init.db')
const {DataTypes} = require('sequelize')

const Service = sequelize.define('services', {
   nama : {
      type : DataTypes.STRING,
      allowNull : false
   },
   alamat : {
      type : DataTypes.STRING,
      allowNull : false,
   },
   harga : {
      type : DataTypes.INTEGER,
      allowNull : false
   },
   keterangan : {
      type : DataTypes.TEXT,
      allowNull : false
   },
   tipe : {
      type : DataTypes.ENUM('Online', 'Home Service', 'Lainya'),
      defaultValue : 'Online'
   },
   status : {
      type : DataTypes.ENUM('pending','publish'),
      defaultValue : 'pending'
   },
   image : {
      type : DataTypes.STRING,
      allowNull : true
   }
})

const sync = (option) => {
   Service.sync(option).then(() => {
      console.log('tabel service created')
   })
}

module.exports = {
   Service,
   sync
}
