let Member = require('../../member/models/Member')
let faker   = require('faker')

module.exports = {
    createMemberByCategoryID: (req, res) => {
        for (let i = 0; i < 5; i++) {
            let newmember = new Member()
    
            newmember.category = req.params.categoryID
            newmember.name     = faker.name.firstName()
            // newmember.name     = 'David'
            newmember.image    = faker.image.image()
    
            newmember.save()
        }

        req.flash('createmembersSuccess', `Fake ${ req.params.categoryName } 5 members created!`)

        res.redirect('/api/admin/get-all-teams')
    }
}
