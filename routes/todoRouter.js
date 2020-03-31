const router = require("express").Router()
const todoController = require("../controllers/todoController.js")

router.get("/",todoController.findAll)
router.get("/:id", todoController.findOne)

router.post("/", todoController.addNewToDo)
router.put("/:id", todoController.update)
router.delete("/:id", todoController.delete)

module.exports = router