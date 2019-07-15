// medthod for getAllProducts

const Product = require('../../product/models/Product')

let paginate = require('../../../routes/product/util/pagination')

module.exports = {
    
 getAllProducts: function (params){
    return new Promise ((resolve, reject) => {
        Product.find(params)
            .then(products => {
                resolve(products)
            })
            .catch(error=> {
                let errors = {}
                errors.status = 500
                errors.message = error
                reject(errors)
            })
    })
},



    getProductByID: (id) => {
        return new Promise((resolve, reject) => {
            Product.findById(id)
                    .then(product => {
                        resolve(product)
                    })
                

                    .catch(error => {
                        let errors = {}
                        errors.status = 500
                        errors.message = error

                        reject(errors)
                    
                    })
    
            })



    },

    getProductsByCategoryID: (id) => {
        return new Promise((resolve, reject) => {
            Product.find({category: id})
                .populate('category')
                .exec()
                    .then(products => {
                        resolve(products)
                    })
                    .catch(error => {
                        let errors = {}
                        errors.status = 500
                        errors.message = error

                        reject(errors)
                    
                    })
    
            })



    },

    getPageIfUserLoggedIn: (req, res) =>{
        if (req.user) paginate(req, res)
        else res.render('index')
    },

  

    searchProductByQuery: (req, res) =>{
        if (req.query.q) {
            Product.search({
                
                query_string:{
                    query: req.query.q
                }
        
            }, (error, results) => {
                    if (error) {
                        let errors = {}
                        errors.status = 500
                        errors.message = error

                        res.status(errors.status).json(errors)
                    } else {
                        let data = results.hits.hits

                        console.log('data: ', data);
                        
                        res.render('search/search-results', {
                            results: data,
                            query: req.query.q
                        })

                    }
            })
        }
    },
    
    instantSearch: (req, res) => {
        Product.search({
            query_string: {
                query: req.body.search_term
            }

        }, (error, result) =>{
            if (error){
                let errors = {}
                errors.status = 500
                errors.message = console.error
                    res.render(errors.status).json(errors)
                } else {
                        res.json(result)
                }
                
            })
            

    
    }

}