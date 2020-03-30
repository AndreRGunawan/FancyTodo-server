const router = require("express").Router()
const todoRouter = require("./todoRouter.js")


router.get('/', (req,res) => {
    res.status(200).json({ message: "Welcome to to-do-list"})
})

router.use('/todos', todoRouter)

module.exports = router