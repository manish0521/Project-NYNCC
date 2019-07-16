var express = require('express');
var router = express.Router();

let memberController = require('./member/controllers/memberController')
let paginate = require('./member/utils/pagination')

/* GET home page. */
router.get('/', memberController.getPageIfUserLoggedIn);

router.get('/page/:page', paginate);

module.exports = router;
