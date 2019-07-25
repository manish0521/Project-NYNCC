let user = require('../models/User')


function paginateUserList(req, res) {
    let perPage = 10
    let page    = req.params.page
    
    user
        .find()
        .skip(perPage * (page - 1))
        .limit(perPage)
        .populate('category')
        .exec()
        .then( users => {
            return users
        })
        .then( users => {
            user
                .count()
                .exec()
                .then( count => {
                    console.log(`count: `, count);
                    console.log(`pages: `, Math.ceil(count / perPage));
                    
                    res.render('userList', {
                        users: users,
                        pages: Math.ceil(count / perPage),
                        current:      page,
                        nextPage:     page + 1,
                        previousPage: page - 1
                        
                    })
                })
                .catch( error => {
                    let errors = {}
                    errors.status = 500
                    errors.message = error

                    res.status(errors.status).json(errors)
                })
        })
        .catch( error => {
            let errors = {}
            errors.status = 500
            errors.message = error

            res.status(errors.status).json(errors)
        })
}

module.exports = paginateUserList


// paste it to userList.ejs for full display
    // <p class="card-text">Role: <%= users[i].profile.role %> </p>
    // <p class="card-text">Batting Style: <%= users[i].profile.batting %> </p>
    // <p class="card-text">Bowling Style: <%= users[i].profile.bowling %> </p> 