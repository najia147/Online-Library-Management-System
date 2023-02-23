const express = require('express')
const adminController = require('../controllers/admin')
const isAuth = require('../middleware/isAuth')

const router = express.Router()
router.get('/book-inventory', isAuth, adminController.getBooksInventory)
router.post('/addbook', adminController.postBookInventory)
router.get('/updatebook/:bookID', isAuth, adminController.getBookInventory)
router.post('/bookupdated', adminController.postUpdateBookInventory)
router.post('/deletedbook', adminController.postDeleteBookInventory)

router.get('/category', isAuth, adminController.getCategoris)
router.post('/addcategory', adminController.postAddCategory)
router.get('/updatecategory/:categoryID', isAuth, adminController.getCategory)
router.post('/categoryupdated', adminController.postUpdateCategory)
router.post('/deletedcategory', adminController.postDeleteCategory)

router.get('/author', isAuth, adminController.getAuthors)
router.post('/addauthor', adminController.postAddAuthor)
router.get('/updateauthor/:authorID', isAuth, adminController.getAuthor)
router.post('/authorupdated', adminController.postUpdateAuthor)
router.post('/deletedauthor', adminController.postDeleteAuthor)

exports.route = router