const router = require("express").Router()
const todoController = require("../controllers/todoController.js")

router.get("/",todoController.findAll)
router.get("/:id", (req,res) => todoController.findOne(req,res))

router.post("/", (req,res) => todoController.addNewToDo(req,res))
router.put("/:id", (req,res) => todoController.update(req,res))
router.delete("/:id", (req,res) => todoController.delete(req,res))

module.exports = router