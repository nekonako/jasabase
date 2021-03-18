const { Service } = require('../model/service.model')
const { Op } = require('sequelize')
const { User } = require('../model/user.model')
const {includes} = require('../config/auth.config')

async function findAllService(req, res, next) {
    try {
        await Service.findAll({
            include : {
                model : User,
                attributes : ['username'],
            }
        })
            .then(service => {
                res.send(service)
                console.log(service)
            })
            .catch(err => {
                console.log(err)
                res.status(400).send({
                    message : 'bad request'
                })
            })
    }  catch(err) {
        console.log(err)
        res.status(400).send({
            message : 'bad request'
        })
    }
}

async function addService(req, res, next){
    try {
        const { nama, alamat, harga, keterangan, tipe, userId } = req.body
        if(!nama || !alamat || !harga || !keterangan || !userId) {
            res.send({
                message : 'data tidak boleh kosong'
            })
            return
        }
        await Service.create({
            nama : nama,
            alamat : alamat,
            harga : harga,
            keterangan : keterangan,
            tipe : tipe,
            userId : userId
        })
            .then(resolve => {
                res.send({
                    message : 'berhasil tambah service'
                })
            })
            .catch(err => {
                console.log(err)
                res.status(500).send({
                    message : 'Internal server error'
                })
            })
    } catch(err){
        console.log(err)
        res.status(500).send({
            message : 'Internal server error'
        })
    }
}

async function getDetailService(req,res,next) {
    try {
        const id = req.params.serviceId
        const service = await Service.findOne({
            where : {
                id : id,
            },
            include : {
                model : User,
                attributes : ['username', 'id', 'avatar'],
                // where : {
                //    id : services.userId
                // }
            }
        })
        if(service){
            res.status(200).send({
                service
            })
        } else {
            res.send({
                message : 'Service not found'
            })
        }

    } catch (err) {
        console.log(err)
        res.status(400).send({
            message : 'Bad request'
        })
    }
}


async function updateService(req, res, next){
    try {
        const { nama, alamat, harga, keterangan, status, user_id } = req.body
        const id = req.params.id
        if(!nama || !alamat || !harga || !keterangan ) {
            res.send({
                message : 'data tidak boleh kosong'
            })
            return
        }
        Service.update({
            nama : nama,
            alamat : alamat,
            harga : harga,
            keterangan : keterangan,
            status : status,
            user_id : id
        }, { where : { id : id } })
            .then(res.send({
                message : 'berhasil update service'
            }))
            .catch(err => {
                console.log(err)
                res.status(500).send({
                    message : 'Internal server error'
                })
            })
    } catch(err){
        console.log(err)
        res.status(500).send({
            message : 'Internal server error'
        })
    }
}

async function deleteService(req, res, next) {
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
    findAllService,
    addService,
    getDetailService,
    updateService,
    deleteService
}
