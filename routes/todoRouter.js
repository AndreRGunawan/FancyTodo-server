const router = require("express").Router()
const todoController = require("../controllers/todoController.js")
const authentication = require("../middlewares/authentication.js")
const authorization = require("../middlewares/authorization.js")

router.use(authentication)
router.get("/", todoController.findAll)
router.post("/", todoController.addNewToDo)
// router.use(authorization)//weirdly this way of writing does not work. why?
router.get("/:id", authorization, todoController.findOne)
router.put("/:id", authorization, todoController.update)
router.delete("/:id", authorization, todoController.delete)

module.exports = router