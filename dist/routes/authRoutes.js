"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Auth_1 = require("../models/Auth");
const router = express_1.default.Router();
// Register Main Admin
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        // 1. Create User
        const salt = yield bcryptjs_1.default.genSalt(10);
        const passwordHash = yield bcryptjs_1.default.hash(password, salt);
        const newUser = new Auth_1.User({
            name,
            email,
            passwordHash,
            role: 'admin',
            avatar: 'https://i.pravatar.cc/150'
        });
        // 2. Create Family Group
        const newGroup = new Auth_1.FamilyGroup({
            name: `${name}'s Family`,
            adminId: newUser._id,
            members: []
        });
        // 3. Create Admin's Profile in the Group
        const adminProfile = new Auth_1.FamilyMemberProfile({
            userId: newUser._id,
            familyGroupId: newGroup._id,
            name: name,
            relation: 'Self',
            age: 30, // Default
            avatar: newUser.avatar
        });
        yield adminProfile.save();
        // Link everything
        newGroup.members.push(adminProfile._id);
        newUser.familyGroupId = newGroup._id;
        yield newGroup.save();
        yield newUser.save();
        res.status(201).json({ message: 'Family created successfully 👨‍👩‍👧‍👦' });
    }
    catch (error) {
        res.status(500).json({ error: 'Registration failed' });
    }
}));
// Login
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield Auth_1.User.findOne({ email });
        if (!user)
            return res.status(400).json({ error: 'Invalid credentials' });
        const validPass = yield bcryptjs_1.default.compare(password, user.passwordHash);
        if (!validPass)
            return res.status(400).json({ error: 'Invalid credentials' });
        const token = jsonwebtoken_1.default.sign({ _id: user._id, role: user.role, familyGroupId: user.familyGroupId }, process.env.JWT_SECRET);
        res.json({ token, user: { name: user.name, role: user.role } });
    }
    catch (err) {
        res.status(500).json({ error: 'Login error' });
    }
}));
exports.default = router;
