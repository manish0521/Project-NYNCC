var express = require('express');
var router = express.Router();

let memberController = require('./member/controllers/memberController')
let paginate = require('./member/utils/pagination')
let paginateList = require('./member/utils/playerList')

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

router.get('/players-list',  memberController.getPlayersList)

router.get('/players-list', paginateList);

router.get('/finances', function (req, res) {
    res.render('finances')
})


module.exports = router;
