const categories = require('../Models/categoryModel')
const items = require('../Models/itemModel')


// add category
exports.addCategoryController = async (req, res) => {
    console.log("Inside CategoryController ");
    let { categoryName, categoryItems } = req.body
    const categoryImage = req.file.filename
    console.log(categoryImage, categoryName, categoryItems);
    categoryName = categoryName.toUpperCase()
    try {
        const existingCategory = await categories.findOne({ categoryName })
        if (existingCategory) {
            res.status(406).json("Category Already exist!!")
        } else {
            const newCategory = new categories({ categoryImage, categoryName, categoryItems })
            await newCategory.save()
            res.status(200).json(newCategory)
        }
    } catch (error) {
        res.status(401).json(error)
    }
}

// get all category
exports.getAllCategoryController = async (req, res) => {
    console.log("Inside CategoryController");
    try {
        const allCategory = await categories.find()
        res.status(200).json(allCategory)
    } catch (error) {
        res.status(401).json(error)
    }
}

// delete category
exports.deleteCategoryController = async (req, res) => {
    const { cid } = req.params
    try {
        const deletedCategory = await categories.findByIdAndDelete({ _id: cid })
        res.status(200).json(deletedCategory)
    } catch (error) {
        res.status(401).json(error)
    }
}

// edit category
exports.editCategoryController = async (req, res) => {
    console.log("Inside EditCategoryController");
    const { cid } = req.params
    let { categoryImage, categoryName, categoryItems } = req.body
    const updatedImage = req.file ? req.file.filename : categoryImage
    console.log(updatedImage, categoryName, categoryItems);
    categoryName = categoryName.toUpperCase()
    try {
        const existingCategory = await categories.findOne({ categoryName: categoryName, _id: { $ne: cid } })
        if (existingCategory) {
            res.status(406).json("Category Already exist!!")
        } else {
            const editedCategory = await categories.findByIdAndUpdate({ _id: cid }, { categoryImage: updatedImage, categoryName, categoryItems }, { new: true })
            console.log(editedCategory);
            await editedCategory.save()
            res.status(200).json(editedCategory)
        }
    } catch (error) {
        res.status(401).json(error)
        console.log(error);
    }
}

// add items
exports.addItemController = async (req, res) => {
    console.log("Inside AddItemController");
    let { itemCategory, itemName, itemPrice } = req.body
    const itemImage = req.file.filename
    itemCategory = itemCategory.toUpperCase()
    itemName = itemName.toUpperCase()
    console.log(itemCategory, itemImage, itemName, itemPrice);
    try {
        const existingCategory = await categories.findOne({ categoryName: itemCategory })
        const existingItem = await items.findOne({ itemName })
        if (existingCategory) {
            if (existingItem) {
                res.status(406).json("Item Already exist!!")
            } else {
                const newItem = new items({ itemCategory, itemImage, itemName, itemPrice })
                await newItem.save()
                res.status(200).json(newItem)
            }

        } else {
            res.status(406).json("Category not found!!")
        }
    } catch (error) {
        res.status(401).json(error)
    }
}

// get all item
exports.getAllItemController = async (req, res) => {
    console.log("Inside getAllItemController");
    try {
        const allItems = await items.find()
        res.status(200).json(allItems)

    } catch (error) {
        res.status(401).json(error)
    }
}

// edit item
exports.editItemController = async (req, res) => {
    console.log("Inside editItemController");
    const { itmid } = req.params
    let { itemImage, itemCategory, itemName, itemPrice } = req.body
    const updatedImage = req.file ? req.file.filename : itemImage
    console.log(updatedImage, itemCategory, itemName, itemPrice);
    itemCategory = itemCategory.toUpperCase()
    itemName = itemName.toUpperCase()
    try {
        const existingCategory = await categories.findOne({ categoryName: itemCategory })
        const existingItem = await items.findOne({ itemName, _id: { $ne: itmid } })
        if (existingCategory) {
            if (existingItem) {
                res.status(406).json("Item Already exist!!")
            } else {
                const editedItem = await items.findByIdAndUpdate({ _id: itmid }, { itemCategory, itemImage: updatedImage, itemName, itemPrice }, { new: true })
                console.log(editedItem);
                await editedItem.save()
                res.status(200).json(editedItem)
            }
        } else {
            res.status(406).json("Category not found!!")
        }
    } catch (error) {
        res.status(401).json(error)
        console.log(error);
    }
}

// delete item
exports.deleteItemController = async (req, res) => {
    const { itmid } = req.params
    try {
        const deletedItem = await items.findByIdAndDelete({ _id: itmid })
        res.status(200).json(deletedItem)
    } catch (error) {
        res.status(401).json(error)
    }
}



// delete and edit item backend completed 