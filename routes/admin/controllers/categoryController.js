const Category = require('../../product/models/Category')

module.exports = {
    
    addCategory: (params) => {
        return new Promise((resolve, reject) => {
            const category = new Category()

            category.name = params.name

            category.save()
                    .then(category => {
                        resolve(category)
                    })
                

                    .catch(error => {
                        let errors = {}
                        errors.confirmation = false

                        if (error.code === 11000) errors.message = 'Category already exists'
                        else                    error.message = error

                        reject(errors)
                    })
    
            })
                                        
    },

//    new method "getAllCategory" which will make a request to MongoDB and render 'create-fake-product' page
        getAllCategories: (req, res) => {
            
            Category.find({})
                .then(categories => {
                    res.render('category/create-fake-product', {categories: categories, success:req.flash('createProductsSuccess')})

                })
                .catch(error =>{
                    let errors = {}
                    errors.status = 500
                    errors.message = error

                    res.status(errors.status).json(errors)
                })
           
                                    
        }
    
}