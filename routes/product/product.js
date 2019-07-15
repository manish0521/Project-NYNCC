const express = require('express');
const router = express.Router();

let Category = require('./models/Category')

let productController = require('../admin/controllers/productController')

let Product = require('./models/Product')

Product.createMapping(function (error, mapping) {
    if (error) {
        console.log('Error creating mapping')
        console.log(mapping)
    } else {
        console.log('Mapping Created')
        console.log(mapping)
    }
})

let stream = Product.synchronize()
let count = 0

stream.on('data', function () {
    count ++
})

stream.on('close', function () {
    console.log(`Indexed ${count} documents`)
})

stream.on('error', function () {
    console.log(error)
})


router.get ('/', function (req, res) {
    res.send('product page')
})



router.post ('/search', (req, res) => {
    res.redirect('/api/product/search?q=' + req.body.q)

})
router.get ('/search', productController.searchProductByQuery)

router.get('/search', productController.instantSearch);

router.post('/instant-search', productController.instantSearch)

// Request for product by ID
router.get ('/:id', function (req, res) {
    productController.getProductByID(req.params.id)
                            .then(product => {
                                res.render('product/product', {
                                    product:product
                                })
                            })
                            .catch(error => {
                                res.status(error.status).json(error)
                            })


})

router.get('/getproductsbycategoryid/:id', function (req, res) {
    console.log(req.params.id)
    productController.getProductsByCategoryID(req.params.id)
                                .then(products => {
                                    res.render('product/products', {products: products})
                                })
                                .catch( error =>{
                                    res.status(error.status).json(error)
                                })

})



module.exports = router