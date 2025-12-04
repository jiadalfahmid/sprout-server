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
const express_1 = __importDefault(require("express")); // Added types for clarity
const auth_1 = require("../middleware/auth");
const Health_1 = require("../models/Health");
const Auth_1 = require("../models/Auth");
const router = express_1.default.Router();
// GET Medicines
router.get('/medicines', auth_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { role, _id, familyGroupId } = req.user;
        let query = {};
        // Find all profiles in this family
        const familyProfiles = yield Auth_1.FamilyMemberProfile.find({ familyGroupId }).select('_id userId');
        const familyProfileIds = familyProfiles.map(p => p._id);
        if (role === 'admin') {
            // Admin sees ALL medicines for the family
            query = { memberId: { $in: familyProfileIds } };
        }
        else {
            // Member sees ONLY their own medicines
            const myProfile = familyProfiles.find(p => { var _a; return ((_a = p.userId) === null || _a === void 0 ? void 0 : _a.toString()) === _id; });
            if (!myProfile)
                return res.status(404).json({ error: 'Profile not found' });
            query = { memberId: myProfile._id };
        }
        const medicines = yield Health_1.Medicine.find(query).populate('memberId', 'name avatar');
        res.json(medicines);
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}));
// LOG DOSE (FIXED)
router.patch('/medicines/:id/log', auth_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { status, timestamp } = req.body; // 'taken', ISOString
        const medicine = yield Health_1.Medicine.findById(id);
        if (!medicine)
            return res.status(404).json({ error: 'Medicine not found' });
        // Decrement stock if taken
        if (status === 'taken') {
            // FIX: Use (medicine.stock || 0) to handle undefined values
            const currentStock = medicine.stock || 0;
            medicine.stock = Math.max(0, currentStock - 1);
        }
        medicine.history.push({ timestamp: new Date(timestamp), status });
        yield medicine.save();
        res.json({ message: 'Dose logged! 💊', stock: medicine.stock });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to log dose' });
    }
}));
exports.default = router;
