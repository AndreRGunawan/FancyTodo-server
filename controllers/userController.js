const { User } = require("../models/index.js")
const { decryptPassword } = require("../helpers/bcrypt.js")
const {OAuth2Client} = require('google-auth-library');
const { generateToken } = require("../helpers/jwt.js")

class UserController {
    static signUp(req,res, next) {
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
            next(err)
        })
    }
    static signIn(req,res, next) {
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
                    return next({
                        name:"BadRequest", 
                        errors: [{
                            message: "Invalid email/password"
                        }]    
                    })
                }
            } else {
                return next({
                    name:"BadRequest", 
                    errors: [{
                        message: "Invalid email/password"
                    }]    
                })
            }
        })
        .catch(err =>{
            return next({
                name:"InternalServerError", 
                errors: [{
                    message: "Invalid email/password"
                }]    
            })
        })
    }
    static googleSign(req,res,next){
        const client = new OAuth2Client(process.env.CLIENT_ID)
        client.verifyIdToken({
            idToken: req.body.id_token,
            audience: process.env.CLIENT_ID  // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        })
            .then(ticket => {
                email = ticket.getPayload().email
                return User.findOne({where:{
                    email
                }})
            })
            .then(data => {
                if(data){
                    let payload = {
                        id: data.id,
                        email: data.email
                    }
                    let token = generateToken(payload)
                    res.status(200).json({
                        id : data.id,
                        email : data.email,
                        token : token
                    })
                } else {
                    user.create({
                        email,
                        password: "google123"
                    })
                }
            })
            .then(data => {
                let payload = {
                    id: data.id,
                    email: data.email
                }
                let token = generateToken(payload)
                    res.status(201).json({
                        id : data.id,
                        email : data.email,
                        token : token
                    })
            })
            .catch(next)
    }
}

module.exports = UserController