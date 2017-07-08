const crpto =  require('crypto-js');
const jwt = require('jsonwebtoken');
const _ = require ('lodash');


// console.log(crpto);

var data = {
    id: 100,
    upendra: 'FirstName',
    reddy: 'MiddleName',
    gummitha: {familyName: 'LastName'}

};

var secret = 'Upendra';

var encoded = jwt.sign(data, secret );

console.log('Encoded Token is: \n',encoded);

var decoded = jwt.verify(encoded, secret);

console.log('Decoded Token is: \n', decoded);

