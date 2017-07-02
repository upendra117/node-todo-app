var mongoose = require('mongoose');
// path to the connection and collection name
var url = (process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');
// mongoose default Promise
mongoose.Promise = global.Promise;
mongoose.connect(url);

module.exports = {mongoose};
