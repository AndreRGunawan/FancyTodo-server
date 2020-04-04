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
        const client = new OAuth2Client(process.env.CLIENT_ID);
        let email = ""
        client.verifyIdToken({
            idToken:req.body.id_token,
            audience: process.env.CLIENT_ID
        })
        .then(ticket => {
            // console.log(ticket, "INI ADALAH TICKET")
            email = ticket.getPayload().email //get payload adalah function buatan google untuk ambil email dari ticket
            return User.findOne({
                where:{
                    email : email //di mana email dari ticket sama dengan email di database kita
                }
            })
        })
        .then(data => {
            if (data){ //kalau emailnya ada--pengguna telah ter-register
                let user = {
                    id: data.id,
                    email: data.email
                }
                let token = generateToken(user)
                res.status(200).json({
                    id : data.id,
                    email : data.email,
                    access_token : token
                })
            } else {
                return User.create({
                    email,
                    password:"Google123"
                })
            }
        })
        .then(data =>{ //kalau tidak ada, kita buatkan, kemudian kita sign-in-kan di sini
            let user = {
                id: data.id,
                email: data.email
            }
            let token = generateToken(user)
            res.status(201).json({ //201 karena kita sudah menambahkan
                id : data.id,
                email : data.email,
                access_token : token
            })
            
        })
        .catch(error => {
            console.log(error, "error di google signin")
        })
    }
}

module.exports = UserController