
const authService = require("../services/auth.service");
const asyncHandler = require("../utils/asyncHandler");

const register = asyncHandler(async (req, res) => {
    const result = await authService.registerAdmin(req.body);

    res.status(201).json({
        success: true,
        message: "Admin registered successfully",
        data: result
    });
});

const login = asyncHandler(async (req, res) => {
    const result = await authService.loginAdmin(req.body);

    res.status(200).json({
        success: true,
        message: "Login successful",
        data: result
    });
});

module.exports = { register, login };

