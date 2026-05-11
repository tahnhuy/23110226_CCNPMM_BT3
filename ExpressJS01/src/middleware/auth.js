require('dotenv').config();
const jwt = require('jsonwebtoken');

/** Paths on this router (under /api/v1) that skip JWT */
const publicPaths = new Set(['/', '/register', '/login', '/forgot-password', '/reset-password']);

const auth = (req, res, next) => {
    if (publicPaths.has(req.path)) {
        return next();
    }
    
    if (req?.headers?.authorization?.split(' ')?.[1]) {
        const token = req.headers.authorization.split(' ')[1];
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = {
                email: decoded.email,
                name: decoded.name,
                id: decoded.id
            };
            return next();
        } catch (error) {
            return res.status(401).json({message: 'Unauthorized'});
        }
    } else {
        return res.status(401).json({message: 'Unauthorized'});
    }
};

module.exports = auth;