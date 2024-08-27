const users = require('../Models/userModel')
const orders = require('../Models/orderModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

// register
exports.registerController = async (req, res) => {
    // console.log("Inside registerController");
    const { userName, phone, email, password, pincode, state, buildingName, city, areaName, landMark } = req.body
    console.log(userName, phone, email, password, pincode, state, buildingName, city, areaName, landMark);
    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            res.status(406).json("Account already exist.. Please login!")
        } else {
            bcrypt.hash(password, 10, async function (err, hash) {
                if (err) {
                    return res.status(500).json("Error hashing password");
                }

                const newUser = new users({
                    userName, phone: phone ? phone : "", email, password: hash, pincode: pincode ? pincode : "", state: state ? state : "", buildingName: buildingName ? buildingName : "", city: city ? city : "", areaName: areaName ? areaName : "", landMark: landMark ? landMark : ""
                })
                await newUser.save()
                res.status(200).json(newUser)
            });
        }

    } catch (error) {
        res.status(401).json(error)
        console.log(error);

    }
}

// login
exports.loginController = async (req, res) => {
    // console.log("inside loginController");
    const { email, password } = req.body
    // console.log(email,password);
    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            bcrypt.compare(password, existingUser.password, function (err, isMatch) {
                if (err) {
                    return res.status(500).json("Login Failed");
                }
                if (!isMatch) {
                    return res.status(404).json("Invalid email/password");
                }
                const token = jwt.sign({ userId: existingUser._id, role: existingUser.role }, process.env.JWT_PASSWORD)
                res.status(200).json({
                    user: existingUser,
                    token
                })
            })
        } else {
            res.status(404).json("Invalid email/password")
        }
    } catch (error) {
        res.status(401).json(error)
    }
}

// set order
exports.orderController = async (req, res) => {
    console.log("inside  orderController");
    const { itemNames, address } = req.body
    const image = req.file.filename
    const orderStatus = 10
    const price = ""
    const userId = req.payload
    console.log(userId, image, itemNames, address);
    try {
        const orderAddress = {
            userName: address['userName'],
            phone: address['phone'],
            pincode: address['pincode'],
            state: address['state'],
            date: address['date'],  // Default to current date if not provided
            buildingName: address['buildingName'],
            city: address['city'],
            areaName: address['areaName'],
            landMark: address['landMark'],
            addressType: address['addressType'] ? address['addressType'] : ""
        };
        const newOrder = new orders({ userId, image, itemNames, address: orderAddress, price, orderStatus })
        console.log(newOrder);

        await newOrder.save()
        res.status(200).json(newOrder)
    } catch (error) {
        res.status(401).json(error)
    }
}

// get each user orders
exports.getAllOrders = async (req, res) => {
    console.log("Inside getAllOrders");
    const userId = req.payload
    try {
        const allOrders = await orders.find({ userId })
        res.status(200).json(allOrders)
    } catch (error) {
        res.status(401).json(error)
    }
}

// delete a order
exports.deleteAOrder = async (req, res) => {
    const { oId } = req.params
    try {
        const deletedOrder = await orders.findByIdAndDelete({ _id: oId })
        res.status(200).json(deletedOrder)
    } catch (error) {
        res.status(401).json(error)
    }
}

// get user details
exports.getUserDetails = async (req, res) => {
    console.log("Inside getUserDetails");
    const userId = req.payload
    try {
        const result = await users.findById({ _id: userId })
        res.status(200).json(result)
    } catch (error) {
        res.status(401).json(error)
    }
}

// update user
exports.updateUser = async (req, res) => {
    console.log("Inside updateUserController");
    const { userName, phone, email, password, pincode, state, buildingName, city, areaName, landMark, userImage } = req.body
    const uploadImage = req.file ? req.file.filename : userImage
    const userId = req.payload
    console.log(userName, phone, email, password, pincode, state, buildingName, city, areaName, landMark, uploadImage, userId);
    try {
        bcrypt.hash(password, 10, async function (err, hash) {
            if (err) {
                return res.status(500).json("Error hashing password");
            }

            const updatedUser = await users.findByIdAndUpdate({ _id: userId }, { userName, phone, email, password:hash, pincode, state, buildingName, city, areaName, landMark, userImage: uploadImage }, { new: true })
            await updatedUser.save()
            res.status(200).json(updatedUser)
        })
    } catch (error) {
        res.status(401).json(error)
    }
}

// delete user
exports.deleteUserController = async (req, res) => {
    console.log("Inside deleteUserController");
    const userId = req.payload
    try {
        const deletedUser = await users.findByIdAndDelete({ _id: userId })
        res.status(200).json(deletedUser)
    } catch (error) {
        res.status(401).json(error)
    }
}