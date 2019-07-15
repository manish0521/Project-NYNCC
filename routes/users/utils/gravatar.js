const crypto = require('crypto')

function getGravatar(email) {
    
    let defaultSize = 200

    if (!email) return `http://gravatar.com/avatar/?s=${defaultSize}&d=retro`

    let md5 = crypto.createHash('md5').update(email).digest('hex')
    return `http://gravatar.com/avatar/${ md5 }?s=${defaultSize}&d=retro`
}

module.exports = getGravatar