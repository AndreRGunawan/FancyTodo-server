const jwt = require("jsonwebtoken")

function generateToken(payload){
    // Di sini terjadi proses pembuatan token
    //var token = jwt.sign({ foo: 'bar' }, 'shhhhh')
    //
    return jwt.sign(payload, process.env.SECRET) // kembalikan token
}

module.exports = generateToken