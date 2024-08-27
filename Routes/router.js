const express = require('express')
const userController = require('../Controllers/userController')
const adminController = require('../Controllers/adminController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const multerMiddleware = require('../Middlewares/multerMiddleware')

const router = new express.Router()

// register
router.post('/register',userController.registerController)

// login
router.post('/login',userController.loginController)

// add category- admin
router.post('/admin/category',jwtMiddleware,multerMiddleware.single('categoryImage'),adminController.addCategoryController)

// get all category - admin
router.get('/admin/all-category',jwtMiddleware,adminController.getAllCategoryController)

// delete category
router.delete('/admin/category/:cid/delete',jwtMiddleware,adminController.deleteCategoryController)

// edit category- admin
router.put('/admin/category/:cid/edit',jwtMiddleware,multerMiddleware.single('categoryImage'),adminController.editCategoryController)

// add item
router.post('/admin/addItem',jwtMiddleware,multerMiddleware.single('itemImage'),adminController.addItemController)

// get all Items - admin
router.get('/admin/all-item',jwtMiddleware,adminController.getAllItemController)

// edit item- admin
router.put('/admin/item/:itmid/edit',jwtMiddleware,multerMiddleware.single('itemImage'),adminController.editItemController)

// delete item
router.delete('/admin/item/:itmid/delete',jwtMiddleware,adminController.deleteItemController)

// add order
router.post('/user/order',jwtMiddleware,multerMiddleware.single('image'),userController.orderController)

// get each user Orders
router.get('/user/all-orders',jwtMiddleware,userController.getAllOrders)

// get all orders - admin
router.get('/admin/all-orders',jwtMiddleware,adminController.getAllOrders)

// update orderStatus - admin
router.put('/admin/orderStatus/:oId/update',jwtMiddleware,multerMiddleware.single('image'),adminController.orderStatusUpdateController)

// update orderPrice - admin
router.put('/admin/orderPrice/:oId/update',jwtMiddleware,multerMiddleware.single('image'),adminController.orderPriceUpdateController)

// delete a order- both
router.delete('/order/:oId/delete',jwtMiddleware,userController.deleteAOrder)

// get user details
router.get('/user/details',jwtMiddleware,userController.getUserDetails)

// update user
router.put('/user/update',jwtMiddleware,multerMiddleware.single('userImage'),userController.updateUser)

// delete user
router.delete('/user/delete',jwtMiddleware,userController.deleteUserController)

module.exports=router