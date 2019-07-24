

let mongoose = require('mongoose')
let mongoosastic = require('mongoosastic')

let memberSchema = new mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        es_type: 'nested',
        es_include_in_parent: true
    },
    name:  { type: String, es_type: 'text', default: '' },
    image: { type: String, es_type: 'text', default: '' }
})

memberSchema.plugin(mongoosastic, {
    hosts: [
        "https://s1vhvr390m:gd7q5b09mm@rowan-123573979.us-east-1.bonsaisearch.net:443"
    ],
    populate: [
        {
            path: 'category'
        }
    ]
})

module.exports = mongoose.model('member', memberSchema)