const jwt = require("jsonwebtoken");

const authenticationToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];


    if(token == null) {
        return res.status(401).json({
            message: "Token não encontrado"
        })
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) {
            return res.status(403).json({
                message: "Token inválido",
            });
        }

        req.user = user;
        next();
    });

};



module.exports = authenticationToken;