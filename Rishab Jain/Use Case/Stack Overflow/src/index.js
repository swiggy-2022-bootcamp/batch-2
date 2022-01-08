const express = require('express');
require('./db/mongoose');
const User = require('./models/User.js')

const app = express();
// port
const PORT = 3000;

// using express to parse incoming json to an object
app.use(express.json());

app.post('/users', (req, res) => {
    const user = new User(req.body);

    user.save().then(() => {
        res.status(201).send(user);
    }).catch((err) => {
        res.status(400).send(err);
    });
});

app.get('/users', (req, res) => {
    User.find({}).then((users) => {
        res.status(200).send(users);
    }).catch((err) => {
        res.status(500).send();
    });
});

app.get('/user_by_id/:id', (req, res) => {
    
    const _id = req.params.id;
    
    User.findById(_id).then((user) => {
        if(!user){
            return res.status(404).send();
        }
        
        res.status(200).send(user);
    }).catch((err) => {
        res.status(500).send();
    });
});

app.listen(PORT, () => {
    console.log('Server is running on ' + PORT);
});
