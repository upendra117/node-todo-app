var mongoose = require('mongoose');

var usersSchema = mongoose.model('usersSchema',{
    email: {
        type: String,
        trim: true,
        minlength: 1,
        required: true
    }

});

module.exports = {
    usersSchema
};