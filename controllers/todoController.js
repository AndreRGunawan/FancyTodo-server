const { Todo } = require("../models/index.js")

class TodoController {
    static findAll(req,res){
        Todo.findAll({
            where:{
                UserId : req.currentUserId
            }
        })
        .then(result => {
            res.status(200).json({
                Message: "All to-dos successfully read", 
                allTodos: result
            })
        })
        .catch(error => {
            res.status(500).json({
                type: "Internal Server Error",
                message : [{error}]
            })
        })
    }
    static findOne(req,res){
        let { id } = req.params
        Todo.findByPk(id)
            .then(result => {
                res.status(200).json({
                    Message: `Selected to-dos with id : ${id} successfully read`, 
                    todo: result
                })
            })
            .catch(error =>{
                res.status(500).json({
                    type: "Internal Server Error",
                    message : [{error}]
                })
            })
    }
    static addNewToDo(req,res){
        let { title, description, status, due_date } = req.body
        let payload = { 
            title, 
            description, 
            status, 
            due_date,
            UserId : req.currentUserId 
        }
        Todo.create(payload)
            .then(result => {
                res.status(201).json({
                    todo: result
                })
            })
            .catch(error => {
                res.status(500).json({
                    type: "Internal Server Error",
                    message : [{error}]
                })
            })
    }
    static update(req,res){
        let { title, description, status, due_date} = req.body
        let { id } = req.params
        Todo.update({title, description, status, due_date}, {
            where: {
                id: id
            },
            returning: true
        })
        .then(result => {
            res.status(200).json({todo:result})
        })
        .catch(error => {
            res.status(500).json({
                type: "Internal Server Error",
                message : [{error}]
            })
        })
    }
    static delete(req,res){
        let { id } = req.params
        let deletedData
        Todo.findByPk(id)
        .then(result =>{
            deletedData = result
            return Todo.destroy({
                where:{ 
                    id : id 
                }}
            )
        })
        .then(_ => {
            res.status(200).json({
                message: "Todo successfully deleted",
                deletedData : deletedData
            })
        })
        .catch(error => {
            res.status(500).json({
                type: "Internal Server Error",
                message : [{error}]
            })
        })
    }
}

module.exports = TodoController