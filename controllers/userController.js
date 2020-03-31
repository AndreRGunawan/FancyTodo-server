const { User } = require("../models/index.js")
const { decryptPassword } = require("../helpers/bcrypt.js")

const generateToken = require("../helpers/jwt.js")

class UserController {
    static signUp(req,res) {
        let payload = {
            email : req.body.email,
            password : req.body.password,
        }
        User.create(payload)
        .then(result => {
            //di sini kita perlu memilah result ke dalam object baru, supaya password tidak ikut dalam token
            console.log(result)
            let user = {
                id: result.id,
                email: result.email            
            }
            //Create token here
            let token = generateToken(user)
            res.status(201).json({
                id: user.id,
                email: result.email,
                access_token: token
            })
        })
        .catch(err => {
            console.log(err,'errrorrrrrrrrrr');
            
            res.status(500).json(err)
        })
    }
    static signIn(req,res) {
        let payload = {
            email: req.body.email,
            password: req.body.password
        }
        User.findOne({where:{
            email : payload.email
        }})
        .then(result => {
            if(result){
                //compare the passwords directly
                let compare = decryptPassword(payload.password, result.password)
                if(compare){
                    let user = {
                        id: result.id,
                        email: result.email
                    }
                    let token = generateToken(user)
                    res.status(200).json({
                        id : user.id,
                        email : user.email,
                        access_token : token
                    })
                } else {
                    res.status(500).json({
                        type:"Bad request", 
                        message: "Invalid email/password"
                    })
                }
            } else {
                res.status(500).json({
                    type:"Bad request", 
                    message: "Invalid email/password"
                })
            }
        })
        .catch(err =>{
            res.status(500).json(err)
        })
    }
}

module.exports = UserController