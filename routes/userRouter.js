const router = require("express").Router()
const userController = require("../controllers/userController.js")

router.post('/signup', userController.signUp)
router.post('/signin', userController.signIn)
router.post('/googleSign', userController.googleSign)
module.exports = router