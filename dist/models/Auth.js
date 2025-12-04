"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.FamilyMemberProfile = exports.FamilyGroup = exports.User = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const UserSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    name: { type: String, required: true },
    avatar: { type: String },
    role: { type: String, enum: ['admin', 'member'], default: 'member' },
    familyGroupId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'FamilyGroup' }
}, { timestamps: true });
exports.User = mongoose_1.default.model('User', UserSchema);
const FamilyGroupSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    adminId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    members: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'FamilyMemberProfile' }]
}, { timestamps: true });
exports.FamilyGroup = mongoose_1.default.model('FamilyGroup', FamilyGroupSchema);
const FamilyMemberProfileSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    familyGroupId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'FamilyGroup', required: true },
    name: { type: String, required: true },
    relation: { type: String, required: true },
    age: { type: Number },
    avatar: { type: String }
});
exports.FamilyMemberProfile = mongoose_1.default.model('FamilyMemberProfile', FamilyMemberProfileSchema);
