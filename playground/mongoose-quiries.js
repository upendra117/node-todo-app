const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');


var id = '59580f0d7efbc8513c129ab9';

Todo.find({
    _id: id
}).then((todos) => {
    console.log('Todos Array: ', todos);
});


Todo.findOne({
    _id: id
}).then((todos) => {
    console.log('Todos-Document: ', todos);
});


Todo.findById(id).then((todos) => {
    if(!todos) {
        return console.log('id not found!');
    }
    console.log('Todos Document: ', todos);
}).catch((err) => {
    console.log('Error found: ', err);
});

var userId = '59580cdf07922a4d2c8cefd2';

User.find({
    _id: userId 
}).then((users) => {
    if (!users) {
        return console.log('Users Array: ', users);
    }
    console.log('Users Array: ', users);
});

User.findById(userId).then((users) => {
    if (!users) {
        return console.log('User Document: ', users);
    }
    console.log('Users Document: ', users);
})