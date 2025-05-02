const jwt = require("jsonwebtoken");

const fetchUser = (req, res, next) => {
        const token = req.header("auth-token");
        if(!token) res.status(401).json({error: "Authenticate with a valid token"})
        try {
            const data = jwt.verify(token, process.env.JWT_SECRET);
            req.user = data;
            next();
        }catch(err) {
            res.status(401).json({error: "Authenticate with a valid token"});
        }
    }

module.exports = fetchUser