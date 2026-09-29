const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const admin = require("../models/admin.model");

const registerAdmin = async ({ name, email, password }) => {
    const existing = await admin.findOne({ email });
    if (existing) {
        const err = new Error("Email already registered");
        err.statusCode = 409;
        throw err;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await admin.create({
        name,
        email,
        password: hashedPassword
    });

    return {
        id: newAdmin._id,
        name: newAdmin.name,
        email: newAdmin.email,
        role: newAdmin.role
    };
};

const loginAdmin = async ({ email, password }) => {
    const foundAdmin = await admin.findOne({ email }).select("+password");
    if (!foundAdmin) {
        const err = new Error("Invalid email or password");
        err.statusCode = 401;
        throw err;
    }

    const isMatch = await bcrypt.compare(password, foundAdmin.password);
    if (!isMatch) {
        const err = new Error("Invalid email or password");
        err.statusCode = 401;
        throw err;
    }

    const token = jwt.sign(
        { id: foundAdmin._id, role: foundAdmin.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
    );

    return {
        token,
        admin: {
            id: foundAdmin._id,
            name: foundAdmin.name,
            email: foundAdmin.email,
            role: foundAdmin.role
        }
    };
};

module.exports = { registerAdmin, loginAdmin };

