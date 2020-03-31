const { Todo } = require("../models/index.js")

function authorization(req, res, next){
    console.log(req.params.id)
    Todo.findOne({
        where:{
            id: req.params.id
        }
    })
    .then(result => {
        if(result){
            if(result.UserId == req.currentUserId){
                return next()
            } else {
                res.status(401).json({
                    name:"Unauthorized", 
                    error: [{message: "User unauthenticated"}]
                })
            }
        } else {
            return res.status(404).json({
                name:"User Not Found", 
                error: [{message: "User Not Found"}]
            })
        }
    })
    .catch(error =>{
        console.log(error)
        res.status(500).json({
            name: "Internal Server Error",
            error: [{message: error}]
        })
    })
}

module.exports = authorization