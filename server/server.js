require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();
var port  = process.env.PORT;
app.use(bodyParser.json());

// POST /todos
app.post('/todos', (req, res) => {
    // console.log(req.body);
    var todoDocument = new Todo({
        text: req.body.text
    });

    todoDocument.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    });
});

// POST /users
app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);

    user.save().then(() => {
        // res.send({user});
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((err) => {
        res.status(400).send(err);
    });
});

// GET /todos
app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos})
    }, (err) => {
        res.status(400).send(err);
    });
});

// GET /users
app.get('/users', (req, res) => {
    User.find().then((users) => {
        res.send({users})
    }, (err) => {
        res.status(400).send(err);
    });
});


// GET /users/me
app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});


// GET /todos/id
app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    // res.send(req.params);
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findById(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((err) => {
        res.status(400).send(err);
    });
});

// GET /users/:id
app.get('/users/:id', (req, res) => {
    var id = req.params.id;
    // res.send(req.params);
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    User.findById(id).then((user) => {
        if (!user) {
            return res.status(404).send();
        }
        res.send({user});
    }).catch((err) => {
        res.status(400).send(err);
    });
});

// DELETE /todos/:id
app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((err) => {
        res.status(400).send();
    });
});

// DELETE /users/:id
app.delete('/users/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findByIdAndRemove(id).then((user) => {
        if (!user) {
            return res.status(404).send();
        }
        res.send({user});
    }).catch((err) => {
        res.status(400).send();
    });
});

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    if(_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((err) => {
        res.status(400).send();
    });
})



app.listen(port, () => {
    console.log(`listening at the port ${port}. \n`);
});

module.exports = {
    app
};

// var text = 'Hello world';