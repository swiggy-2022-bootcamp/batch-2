const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const bearerToken = authHeader && authHeader.split(' ')[1];

    if(bearerToken == null){
        return res.sendStatus(401).json({
            errorMessage: 'Please provide a Bearer Token'
        });
    }

    jwt.verify(bearerToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) {
            return res.sendStatus(403).json({
                errorMessage: 'Invalid Token'
            });
        }
        req.user = user;
        next();
    })
}

module.exports = authenticateToken;