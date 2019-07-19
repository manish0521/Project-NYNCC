var express = require('express');
var router = express.Router();

let memberController = require('./member/controllers/memberController')
let paginate = require('./member/utils/pagination')

/* GET home page. */
router.get('/', memberController.getPageIfUserLoggedIn);

router.get('/page/:page', paginate);

router.get('/coach', function (req, res) {
    res.render('coach')
})

router.get('/captain', function (req, res) {
    res.render('captain')
})

router.get('/management', function (req, res) {
    res.render('management')
})

module.exports = router;
