const mongoose = require('mongoose')

exports.validateID = id => {
    if(!mongoose.Types.ObjectId.isValid(id)) throw new Error('Invalid ID')
}