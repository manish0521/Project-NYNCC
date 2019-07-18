const express = require('express')
const router  = express.Router()

let memberController = require('./controllers/memberController')
console.log('5: ');


let Member = require('./models/Member')

Member.createMapping(function (error, mapping) {
    if (error) {
        console.log('Error creating mapping')
        console.log(mapping)
    } else {
        console.log('Mapping created')
        console.log(mapping)
    }
})

let stream = Member.synchronize()
let count  = 0

stream.on('data', function () {
    count++
})

stream.on('close', function () {
    console.log(`Indexed ${ count } documents`)
})

stream.on('error', function () {
    console.log("30: Error: " + error)
})

router.get('/', function (req, res) {
    res.send('member page')
})

router.post('/search', (req, res) => {
    res.redirect('/api/member/search?q=' + req.body.q)
})

router.get('/search', memberController.searchMemberByQuery)

router.get('/:id', function (req, res) {
    memberController.getMemberByID(req.params.id)
                        .then( member => {
                            res.render('member/member', {
                                member: member
                            })
                        })
                        .catch( error => {
                            res.status(error.status).json(error)
                        })
})

router.get('/getmembersbycategoryid/:id', function (req, res) {
    memberController.getMembersByCategoryID(req.params.id)
                        .then(members => {
                            res.render('member/members', {
                                members: members
                            })
                        })
                        .catch( error => {
                            res.status(error.status).json(error)
                        })
})

module.exports = router