const MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/TodoApp'

MongoClient.connect(url, (err, db) => {
    if (err) {
        return console.log('unable to connect to mongodb server.');
    }

    console.log('connection succesful to mongodb server.');

    // db.collection('Todos').insertOne({
    //     text:'Something to do',
    //     completed:false
    // }, (err,result) => {
    //     if (err) {
    //         return console.log('unable to insert documnet.', err);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    db.collection('users').insertOne({
        name:'Upendra Reddy',
        age: 32,
        location:'London'
    }, (err, result) => {
        if (err) {
            return console.log('unable to insert document in to mongodb collection,', err);
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
    });

    db.close(); 
});