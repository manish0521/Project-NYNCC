let member = require('../../member/models/member')
let faker   = require('faker')

module.exports = {
    createproductByCategoryID: (req, res) => {
        for (let i = 0; i < 10; i++) {
            let newproduct = new member()
    
            newproduct.category = req.params.categoryID
            newproduct.name     = faker.commerce.productName()
            newproduct.price    = faker.commerce.price()
            newproduct.image    = faker.image.image()
    
            newproduct.save()
        }

        req.flash('createproductsSuccess', `Fake ${ req.params.categoryName } 10 products created!`)

        res.redirect('/api/admin/get-all-teams')
    }
}
