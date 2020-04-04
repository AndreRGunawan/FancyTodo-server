const router = require('express').Router()
const apiController = require("../controllers/apiController.js")

router.get('/productivitytips', apiController.showProductivityTips)

module.exports = router