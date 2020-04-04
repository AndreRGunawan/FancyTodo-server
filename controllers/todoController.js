const { Todo } = require("../models/index.js")

class TodoController {
    static findAll(req,res, next){
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
            return next({
                name: "Internal Server Error",
                errors : [{ error }]
            })
        })
    }
    static findOne(req,res,next){
        let { id } = req.params
        Todo.findByPk(id)
            .then(result => {
                res.status(200).json({
                    Message: `Selected to-dos with id : ${id} successfully read`, 
                    todo: result
                })
            })
            .catch(error =>{
                return next({
                    name: "Internal Server Error",
                    errors : [{ error }]
                })
            })
    }
    static addNewToDo(req,res,next){
        console.log('masuk add new todo');
        
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
                console.log(result,'resultttttttttttt')
                res.status(201).json({
                    todo: result
                })
            })
            .catch(error => {
                console.log(error,'erororr')
                return next({
                    name: "Internal Server Error",
                    errors : [{ error }]
                })
            })
    }
    
    static update(req,res,next){
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
            console.log(error)
            return next({
                name: "Internal Server Error",
                errors : [{ error }]
            })
        })
    }
    static completeTaskStatus(req,res,next){
        let { id } = req.params
        Todo.findByPk(id)
        .then(result => {
            console.log(result.title)
            let updatedData = {
                title : result.title, 
                description : result.description, 
                status: true, 
                due_date: result.due_date
            }
            console.log(updatedData)
            return Todo.update(updatedData, {where:{
                    id:id
                }, returning:true
            })
        })
        .then(result => {
            res.status(200).json({todo:result})
        })
        .catch(error => {
            console.log(error)
        })
    }
    static uncompleteTaskStatus(req,res, next){
        let { id } = req.params
        Todo.findByPk(id)
        .then(result => {
            console.log(result.title)
            let updatedData = {
                title : result.title, 
                description : result.description, 
                status: false, 
                due_date: result.due_date
            }
            return Todo.update(updatedData, {where:{
                    id:id
                }, returning:true
            })
        })
        .then(result => {
            res.status(200).json({todo:result})
        })
        .catch(error => {
            console.log(error)
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
            return next({
                name: "Internal Server Error",
                errors : [{ error }]
            })
        })
    }
}

module.exports = TodoController