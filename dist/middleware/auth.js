"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkFamilyScope = exports.isAdmin = exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    var _a;
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
    if (!token)
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (ex) {
        res.status(400).json({ error: 'Invalid token.' });
    }
};
exports.authMiddleware = authMiddleware;
// Check if user is Admin
const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Access denied. Admins only.' });
    }
    next();
};
exports.isAdmin = isAdmin;
// Check if resource belongs to user's family
const checkFamilyScope = (req, res, next) => {
    // Logic to verify req.body.familyGroupId or resource matches req.user.familyGroupId
    // For simplicity, we typically filter by req.user.familyGroupId in the Controller query
    next();
};
exports.checkFamilyScope = checkFamilyScope;
