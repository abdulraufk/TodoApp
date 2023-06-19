const jwt = require('jsonwebtoken');
const sec = 'secryyyyyyyyyyyyyyyyyyssssssssssssset';


const isLoggedIn = (req, res, next) => {
    if (req.headers && req.headers.token) {

        var decoded = jwt.verify(req.headers.token, sec);
        req.email = decoded.email
        next();
    } else {
        return res.status(401).json({
            message: "Not Allowed!!!!"
        })
    }
}
module.exports = {
    isLoggedIn
}