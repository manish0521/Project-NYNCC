let Member = require('../models/Member')

let paginate = require('../utils/pagination')
let paginateList = require('../utils/playerList')

module.exports = {
    getAllMembers: function (params){
        return new Promise((resolve, reject) => {
            Member.find(params)
                    .then(members => {
                        resolve(members)
                    })
                    .catch( error => {
                        let errors     = {}
                        errors.status  = 500
                        errors.message = error

                        reject(errors)
                    })
        })
    },
    getMemberByID: (id) => {
        return new Promise((resolve, reject) => {
            Member.findById(id)
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
    getMembersByCategoryID: (id) => {
        return new Promise((resolve, reject) => {
            Member.find({category: id})
                    .populate('category')
                    .exec()
                    .then( members => {
                        resolve(members)
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

    getPlayersList:(req, res, next) => {
         paginateList(req, res, next)
    },

    searchMemberByQuery: (req, res) => {
        if (req.query.q) {
            Member.search({
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

                        console.log('data: ', data);
                    
                    res.render('search/search-results', {
                        results: data,
                        query:   req.query.q
                    })
                }
            })
        }
    }
}