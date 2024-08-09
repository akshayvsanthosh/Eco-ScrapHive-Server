require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./Routes/router')
require('./DB/connection')

const ESHServer = express()
ESHServer.use(cors())
ESHServer.use(express.json())
ESHServer.use(router)
ESHServer.use('/uploads',express.static('./uploads'))

const PORT = 3000 || process.env.PORT

ESHServer.listen(PORT,()=>{
    console.log(`ESHServer Started at ${PORT}`);
})

ESHServer.get('/',(req,res)=>{
    res.status(200).send("<h1>ESHServer Started</h1>")
})
