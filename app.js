require('dotenv').config()
const express = require('express')
const app = express()
const cors=require("cors")
const port = process.env.port
const router = require("./routes/index.js")

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.use('/', router)

app.use((err, req, res, next) => {
    if(err.name == "SequelizeValidationError"){
        const errors = err.errors.map(el => ({
            message : el.message
        }))
        return res.status(400).json({
            code:"400",
            type:"BadRequest",
            errors
        })
    } else if(err.name == "BadRequest"){
        return res.status(400).json({
            errors: err.errors
        })
    } else if(err.name == "InternalServerError"){
        return res.status(500).json({
            errors: err.errors
        })
    } else if(err.name == "User Not Found"){
        return res.status(404).json({
            errors: err.errors
        })
    }else if(err.name == "JsonWebTokenError"){
        return res.status(401).json({
            errors: err.errors,
            message: "Please sign in first"
        })
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))