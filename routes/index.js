var express = require('express');
var router = express.Router();

let productController = require('./admin/controllers/productController')
let paginate = require('./product/util/pagination')


/* GET home page. */
router.get('/', productController.getPageIfUserLoggedIn);

router.get('/page/:page', paginate);

router.get('/test', (req, res) => {
    res.render('test')
});

router.post('/testJquery', (req, res) =>{
    console.log(req.body)

    res.send({
        result: 'success',
        testKey: 'testValue'
    })
    
})






module.exports = router;
