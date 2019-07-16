let express = require('express')
let router  = express.Router()

let categoryController = require('./controllers/categoryController')
let creatememberController = require('./controllers/createMemberController')
let categoryValidation = require('./utils/categoryValidation')

let member = require('../member/models/member')

router.get('/', function (req, res) {
    res.send('Admin Worked')
})

router.get('/add-category', function (req, res) {
    res.render('member/addcategory', { errors:  req.flash('addCategoryError'), 
                                        success: req.flash('addCategorySuccess') })
})

router.post('/add-category', categoryValidation, function (req, res) {
    categoryController.addCategory(req.body)
                .then(category => {
                    req.flash('addCategorySuccess', `Added ${ category.name }!`)

                    res.redirect('/api/admin/add-category')
                })
                .catch(error => {
                    req.flash('addCategoryError', error.message)

                    res.redirect('/api/admin/add-category')
                })
})

router.get('/get-all-teams', categoryController.getAllteams)

router.get('/create-fake-member/:categoryName/:categoryID', creatememberController.createMemberByCategoryID)

module.exports = router