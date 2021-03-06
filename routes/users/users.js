const express = require('express');
const router = express.Router();
const passport = require('passport')

let userController = require('../users/controllers/userController')
let signupValidation = require('./utils/signupValidation')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Hey class!!!');
});

router.get('/signup', function(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }

    res.render('auth/signup', { errors: req.flash('errors'), error_msg: null })
});

router.post('/signup', signupValidation, userController.signup)

router.get('/signin', function (req, res) {
    if (req.isAuthenticated()) {
        res.redirect('/')
    }

    res.render('auth/signin', { errors: req.flash('loginMessage') })
})

router.post('/signin', passport.authenticate('local-login', {
    successRedirect:  '/',
    failureRedirect: '/api/users/signin',
    failureFlash:    true
}))

router.get('/logout', function (req, res, next) {
    req.logout()

    res.redirect('/')
})

router.get('/edit-profile', function (req, res) {
    if (!req.isAuthenticated()) res.redirect('/api/users/signin')

    res.render('account/profile', { errors:  req.flash('errors'),
                                    success: req.flash('success')})
})

router.put('/edit-profile', function (req, res) {
    userController.updateProfile(req.body, req.user._id)
                    .then(user => {
                        req.flash('success', 'Successfully updated profile!')

                        res.redirect('/api/users/edit-profile')
                    })
                    .catch(error => {
                        req.flash('errors', error)

                        res.redirect('/api/users/edit-profile')
                    })
})

router.get('/:id', function (req, res) {
    userController.getUserByID(req.params.id)
                        .then( user => {
                            res.render('user/user', {
                                user: user
                            })
                        })
                        .catch( error => {
                            res.status(error.status).json(error)
                        })
})

module.exports = router;