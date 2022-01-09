
const questionsAuth = (req, res, next) => {
    if (req.question.author._id.equals(req.user.id)) return next();
    res.status(401).end();
};

module.exports = questionsAuth;