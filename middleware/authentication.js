const jwt = require('jsonwebtoken')

function auth(req, res, next) {
    const headers = req.headers
    const bearerHeader = headers.authorization ? headers.authorization.split(" ")[1] : "";

    if (!bearerHeader) {
        return res.status(403).json({
            message: 'authentication failed',
            status: 403
        });
    }

    try {
        let results = jwt.verify(bearerHeader, "rahasiabang")
        req.users = results;
        next()

    } catch (err) {
        res.status(403).json({
            message: 'authorization failed',
            status: 403
        })
    }
}

module.exports = auth