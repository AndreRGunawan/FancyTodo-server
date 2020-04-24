require('dotenv').config()//
const express = require('express')
const app = express()

const cors = require("cors")//
const port = process.env.port//
const errorHandler = require("./middlewares/errorHandler.js")//
const router = require("./routes/index.js")//

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())//

app.use('/', router)

app.use(errorHandler)//

app.listen(port, () => console.log(`Example app listening on port ${port}!`))