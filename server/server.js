var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {todosSchema} = require('./models/todosSchema');
var {usersSchema} = require('./models/usersSchema');


var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    // console.log(req.body);
    var todoDocument = new todosSchema({
        text:req.body.text
    });

    todoDocument.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.send(err);
    });
});

app.listen(3000, () => {
    console.log('listening at port 3000. \n');
});