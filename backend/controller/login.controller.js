const { User } = require('../model/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secretKey = require('../config/auth.config')

async function loginUser(req, res, next) {
    const username = req.body.username
    const password = req.body.password
    await  User.findOne({
        where : {
            username : username,
        }
    })
        .then(data => {
            bcrypt.compare(password, data.password, (err, result) => {
                console.log(result)
                console.log(data.password)
                if(result == true) {
                    let token = jwt.sign({ username : username, id : data.id }, secretKey, {expiresIn : '1h'})
                    res.cookie('token', token, { secure : false , httpOnly : true })
                    res.send({token})
                } else {
                    console.log(err)
                    res.status(401).send({
                        message : 'username atau password salah'
                    })
                }
            })
        })
        .catch(err => {
            console.log(err)
            res.status(400).send({
                message : 'Bad request'
            })
        })
}

module.exports = loginUser
