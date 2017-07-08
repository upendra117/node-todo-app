var {User} = require('./../models/user')
var authenticate = (req, res, next) => {
    var token = req.header('x-auth');
    // console.log('Token Print \n', token);
    User.findByToken(token).then((user) => {
        if (!user) {
            console.log('Error here!')
            return Promise.reject();
        }
        
        req.user = user;
        req.token = token;
        next();
    }).catch((err) => {
        res.status(401).send();
    });
};

module.exports = {
    authenticate
};