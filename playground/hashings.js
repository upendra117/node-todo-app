const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
// var message = 'I am user number 3';
// var hash = SHA256(message).toString();

// console.log(`message: ${message}`);
// console.log(`Hash: ${hash}`);

var data = {
    id: 10
};

var token = jwt.sign(data, 'upendra');
console.log(`Token: ${token}`);

var decoded = jwt.verify(token, 'upendra');
console.log('Decoded', decoded);