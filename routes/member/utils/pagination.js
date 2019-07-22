let member = require('../models/Member')

function paginate(req, res) {
    let perPage = 9
    let page    = req.params.page
    
    member
        .find()
        .skip(perPage * (page - 1))
        .limit(perPage)
        .populate('category')
        .exec()
        .then( members => {
            return members
        })
        .then( members => {
            member
                .count()
                .exec()
                .then( count => {
                    console.log(`count: `, count);
                    console.log(`pages: `, Math.ceil(count / perPage));
                    
                    // if used 'member/member-main' insted of index then it will skip home page and show only members
                    res.render('index', {
                        members: members,
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

module.exports = paginate