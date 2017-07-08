var mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var secret = 'Upendra';


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

UserSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();
    return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id:user._id.toHexString(), access}, secret).toString();
    user.tokens.push({
        access,
        token
    });

    return user.save().then(() => {
        return token;
    });
};

UserSchema.statics.findByToken = function (token) {
    var User = this;
    try {
        var decoded = jwt.verify(token, secret);
    }catch (err) {
        return new Promise((resolve, reject) => {
            reject('Error in decoding the token.');
        });
    }

    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': decoded.access
    });
};

var User = mongoose.model('User_Collection', UserSchema);

module.exports = {
    User
};