let member = require('../../member/models/member')
let faker   = require('faker')

module.exports = {
    createMemberByCategoryID: (req, res) => {
        for (let i = 0; i < 5; i++) {
            let newmember = new member()
    
            newmember.category = req.params.categoryID
            newmember.name     = faker.name.memberName()
            newmember.price    = faker.commerce.price()
            newmember.image    = faker.image.image()
    
            newmember.save()
        }

        req.flash('createmembersSuccess', `Fake ${ req.params.categoryName } 5 members created!`)

        res.redirect('/api/admin/get-all-teams')
    }
}
