
const questionsAuth = (req, res, next) => {
    console.log(req);
    // if (req.question.author._id.equals(req.user.user_id)) return next();
    res.status(401).end();
};

module.exports = questionsAuth;