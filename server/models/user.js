var mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = mongoose.Schema({
    email: {
        type: String,
        trim: true,
        minlength: 1,
        required: [true, 'User Email required'],
        unique: true,
        validate: {
            isAsync: false,
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        required: [true, 'Password required.'],
        minlength: 6
    },
    tokens: [{
        access:{

        },
        token:{

        }
    }]
});

// UserSchema.methods.toJSON = function () {
//     var user = this;
//     var userObject = user.toObject();
//     return _.pick(userObject, ['_id', 'email']);
// };

UserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id:user._id.toHexString(), access}, 'Upendra').toString();
    user.tokens.push({
        access,
        token
    });

    return user.save().then(() => {
        return token;
    });
};

var User = mongoose.model('User_Collection',UserSchema);

module.exports = {
    User
};