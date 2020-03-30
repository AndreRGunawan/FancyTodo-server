const { Todo } = require("../models/index.js")

class TodoController {
    static findAll(req,res){
        Todo.findAll()
        .then(result => {
            res.status(200).json({
                Message: "All to-dos successfully read", 
                allTodos: result
            })
        })
        .catch(error => {
            res.status(500).json(err)
        })
    }
    static findOne(req,res){
        let { id } = req.params
        Todo.findByPk(id)
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err =>{
                res.status(500).json(err)
            })
    }
    static addNewToDo(req,res){
        let { title, description, status, due_date } = req.body
        Todo.create({title, description, status, due_date})
            .then(result => {
                res.status(201).json(result)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
    static update(req,res){
        let { title, description, status, due_date} = req.body
        let { id } = req.params
        Todo.update({title, description, status, due_date}, {
            where: {
                id: id
            }
        })
        .then(_ => {
            return Todo.findByPk(id)
        })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
    static delete(req,res){
        let { id } = req.params
        let deletedData
        Todo.findByPk(id)
        .then(result1 =>{
            deletedData = result1
            return Todo.destroy({
                where:{ 
                    id : id 
                }}
            )
        })
        .then(result2 => {
            res.status(200).json({
                message: "Todo successfully deleted",
                deletedData : deletedData
            })
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
}

module.exports = TodoController