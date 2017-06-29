var mongoose = require('mongoose');
// path to the connection and collection name
var url = 'mongodb://localhost:27017/TodoApp'
// mongoose default promise
mongoose.promise = global.promise;
mongoose.connect(url);

module.exports = {mongoose};
