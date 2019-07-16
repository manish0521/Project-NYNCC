let member = require('../models/member')

function paginate(req, res) {
    let perPage = 9
    let page    = req.params.page
    
    member
        .find()
        .skip(perPage * (page - 1))
        .limit(perPage)
        .populate('category')
        .exec()
        .then( products => {
            return products
        })
        .then( products => {
            member
                .count()
                .exec()
                .then( count => {
                    console.log(`count: `, count);
                    console.log(`pages: `, Math.ceil(count / perPage));
                    
                    res.render('member/member-main', {
                        products: products,
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