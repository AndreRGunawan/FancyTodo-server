const router = require("express").Router()
const todoRouter = require("./todoRouter.js")
const userRouter = require("./userRouter.js")

// router.get('/', (req,res) => {
//     res.status(200).json({ message: "Welcome to to-do-list"})
// })

router.use('/', userRouter)
router.use('/todos', todoRouter)

module.exports = router