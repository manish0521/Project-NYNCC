const mongoose = require('mongoose');

let CategorySchema = mongoose.Schema({
    name: {type: String, unique:true, lowercase:true}
})

module.exports = mongoose.model('category', CategorySchema)