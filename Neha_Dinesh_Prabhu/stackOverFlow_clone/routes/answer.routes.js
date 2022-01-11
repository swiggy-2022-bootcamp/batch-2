const auth = require('../middleware/auth');

module.exports = app => {
    const answers = require("../controllers/answer.js");
    var router = require("express").Router();

    router.post('/', [auth], answers.createAnswer);
    router.delete('/delete', [auth], answers.removeAnswer);
    app.use('/answers', router);
}