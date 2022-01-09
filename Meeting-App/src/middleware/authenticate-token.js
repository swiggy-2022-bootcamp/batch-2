const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const bearerToken = authHeader && authHeader.split(' ')[1];

    if(bearerToken == null){
        return res.status(401).json({
            errorMessage: `Unauthorize Request!!!. Please provide authentication credentials`
        });
    }

    jwt.verify(bearerToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) {
            return res.status(403).json({
                errorMessage: `Please provide Valid authentication credentials`
            });
        }
        req.user = user;
        next();
    })
}

module.exports = authenticateToken;