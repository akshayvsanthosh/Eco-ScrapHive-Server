const users = require('../Models/userModel')
const jwt = require('jsonwebtoken')


// register
exports.registerController= async (req,res)=>{
    // console.log("Inside registerController");
    const {userName,phone,email,password,pincode,state,buildingName,city,areaName,landMark} = req.body
    // console.log(userName,phone,email,password,pincode,state,buildingName,city,areaName,landMark);
    try {
        const existingUser = await users.findOne({email})
        if (existingUser) {
            res.status(406).json("Account already exist.. Please login!")
        } else {
            const newUser = new users({
                userName,phone:phone?phone:"",email,password,pincode:pincode?pincode:"",state:state?state:"",buildingName:buildingName?buildingName:"",city:city?city:"",areaName:areaName?areaName:"",landMark:landMark?landMark:""
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
        
    } catch (error) {
        res.status(401).json(error)
    }
}

// login
exports.loginController = async (req,res)=>{
    // console.log("inside loginController");
    const {email,password} = req.body
    // console.log(email,password);
    try {
        const existingUser = await users.findOne({email,password})
        if (existingUser) {
            const token = jwt.sign({userId:existingUser._id,role:existingUser.role},process.env.JWT_PASSWORD)
            res.status(200).json({
                user:existingUser,
                token
            })
        } else {
            res.status(404).json("Invalid email/password")
        }
    } catch (error) {
        res.status(401).json(error)
    }
}