const router = require("express").Router()
const todoRouter = require("./todoRouter.js")
const userRouter = require("./userRouter.js")
const apiRouter = require("./apiRouter.js")

// router.get('/', (req,res) => {
//     res.status(200).json({ message: "Welcome to to-do-list"})
// })

router.use('/', userRouter)
router.use('/todos', todoRouter)
router.use('/api', apiRouter)

module.exports = router