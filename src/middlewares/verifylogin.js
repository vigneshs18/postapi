const jwt = require('jsonwebtoken');

const jwt_private_key = process.env.JWT_PRIVATE_KEY || '';

module.exports = function (req, res, next) {
    const token = req.header('x-access-token');
    if(!token) return res.status(401).send({
        status: 'Fail',
        message: 'Access Denaid, No token provided',
        data: null
    });

    try {
        const decoded = jwt.verify(token, jwt_private_key);
        // if(!(decoded._id & decoded.name & decoded.email)) return res.status(403).send({
        //     status: 'Fail',
        //     message: 'Access Denaid, Forbidden resource',
        //     data: null
        // });
        req.userTokenData = decoded;
        next();
    } catch (err) {
        res.status(400).send({
            status: 'Fail',
            message: `Invalid token: ${err.message}`,
            data: null
        });
    } 
}