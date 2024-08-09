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

module.exports=router