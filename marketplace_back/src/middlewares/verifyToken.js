require('dotenv').config()
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET ;

module.exports = function(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(403).send('Token requerido');
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(500).send('Token inválido');
        req.userId = decoded.id;
        next();
    });
};
