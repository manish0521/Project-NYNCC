// var express = require('express');
// var router = express.Router();

// let productController = require('./admin/controllers/productController')



// router.get('/products/:page', function(req, res, next) {
//     let perPage = 9
//     let page = req.params.page || 1

//     Product
//         .find({})
//         .skip((perPage * page) - perPage)
//         .limit(perPage)
//         .exec(function(err, products) {
//             Product.count().exec(function(err, count) {
//                 if (err) return next(err)
//                 res.render('./product/products', {
//                     products: products,
//                     current: page,
//                     pages: Math.ceil(count / perPage)
//                 })
//             })
//         })
// })