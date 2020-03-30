require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.port
const router = require("./routes/index.js")

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/', router)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))