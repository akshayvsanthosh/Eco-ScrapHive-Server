const mongoose = require('mongoose')

const connection_string=process.env.CONNECTION_STRING

mongoose.connect(connection_string).then((res)=>{
    console.log("ESHServer connected to MongoDB");
}).catch(error=>{
    console.log("Connection Failed");
    console.log(error);
})