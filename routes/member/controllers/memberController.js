let member = require('../models/member')

let paginate = require('../utils/pagination')

module.exports = {
    getAllmembers: (params) => {
        return new Promise((resolve, reject) => {
            member.find(params)
                    .then(products => {
                        resolve(products)
                    })
                    .catch( error => {
                        let errors     = {}
                        errors.status  = 500
                        errors.message = error

                        reject(errors)
                    })
        })
    },
    getmemberByID: (id) => {
        return new Promise((resolve, reject) => {
            member.findById(id)
                    .then(member => {
                        resolve(member)
                    })
                    .catch( error => {
                        let errors     = {}
                        errors.status  = 500
                        errors.message = error

                        reject(errors)
                    })
        })
    },
    getproductsByCategoryID: (id) => {
        return new Promise((resolve, reject) => {
            member.find({category: id})
                    .populate('category')
                    .exec()
                    .then( products => {
                        resolve(products)
                    })
                    .catch( error => {
                        let errors     = {}
                        errors.status  = 500
                        errors.message = error

                        reject(errors)
                    })
        })
    },
    getPageIfUserLoggedIn: (req, res, next) => {
        if (req.user) paginate(req, res, next)
        else res.render('index')
    },
    searchproductByQuery: (req, res) => {
        if (req.query.q) {
            member.search({
                query_string: {
                    query: req.query.q
                }
            }, (error, results) => {
                if (error) {
                    let errors     = {}
                    errors.status  = 500
                    errors.message = error

                    res.status(errors.status).json(errors)
                } else {
                    let data = results.hits.hits
                    
                    res.render('search/search-results', {
                        results: data,
                        query:   req.query.q
                    })
                }
            })
        }
    }
}