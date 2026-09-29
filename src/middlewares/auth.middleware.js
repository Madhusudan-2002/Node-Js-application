const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            success: false,
            message: "Not authorized — token missing"
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;  // { id, role, iat, exp }
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Not authorized — invalid or expired token"
        });
    }
};

module.exports = authMiddleware;
