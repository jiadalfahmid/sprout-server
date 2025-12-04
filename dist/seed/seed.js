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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv = __importStar(require("dotenv"));
const Auth_1 = require("../models/Auth");
const Finance_1 = require("../models/Finance");
const Health_1 = require("../models/Health");
const Task_1 = require("../models/Task");
// Import data
const mockData_1 = require("./mockData");
dotenv.config();
const seedDB = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!process.env.MONGO_URI) {
        console.error('❌ MONGO_URI is missing in .env file');
        process.exit(1);
    }
    try {
        yield mongoose_1.default.connect(process.env.MONGO_URI);
        console.log('🌱 Connected to DB for Seeding...');
        // 1. Clear existing data
        yield Auth_1.User.deleteMany({});
        yield Auth_1.FamilyGroup.deleteMany({});
        yield Auth_1.FamilyMemberProfile.deleteMany({});
        yield Finance_1.Transaction.deleteMany({});
        yield Finance_1.Bill.deleteMany({});
        yield Health_1.Medicine.deleteMany({});
        yield Health_1.Appointment.deleteMany({});
        yield Task_1.TaskList.deleteMany({});
        yield Task_1.Task.deleteMany({});
        yield Finance_1.SavingsGoal.deleteMany({});
        // 2. Create Admin User
        const admin = new Auth_1.User({
            name: mockData_1.mockUser.name,
            email: 'alex@sprout.com',
            passwordHash: '$2a$10$abcdefg...', // Mock hash
            role: 'admin',
            avatar: mockData_1.mockUser.avatar
        });
        // 3. Create Family Group
        const group = new Auth_1.FamilyGroup({
            name: 'The Doe Family',
            adminId: admin._id,
            members: []
        });
        yield group.save();
        admin.familyGroupId = group._id;
        yield admin.save();
        // 4. Create Profiles & Map UUIDs
        // Map<MockUUID, MongoObjectId>
        const memberMap = new Map();
        for (const mockMember of mockData_1.mockFamilyMembers) {
            const profile = new Auth_1.FamilyMemberProfile({
                familyGroupId: group._id,
                name: mockMember.name,
                relation: mockMember.relation,
                age: mockMember.age,
                avatar: mockMember.avatar
            });
            if (mockMember.relation === 'Self') {
                profile.userId = admin._id;
            }
            yield profile.save();
            memberMap.set(mockMember.id, profile._id);
            group.members.push(profile._id);
        }
        yield group.save();
        console.log('✅ Family & Profiles Created');
        // 5. Seed Finance (Shared) - FIX: Remove 'id' from mock objects
        const transactionsWithGroupId = mockData_1.mockTransactions.map((t) => {
            const { id } = t, rest = __rest(t, ["id"]); // Exclude ID
            return Object.assign(Object.assign({}, rest), { familyGroupId: group._id, date: new Date(t.date) });
        });
        yield Finance_1.Transaction.insertMany(transactionsWithGroupId);
        const billsWithGroupId = mockData_1.mockBills.map((b) => {
            const { id } = b, rest = __rest(b, ["id"]); // Exclude ID
            return Object.assign(Object.assign({}, rest), { familyGroupId: group._id, dueDate: new Date(b.dueDate), paidOn: b.paidOn ? new Date(b.paidOn) : undefined });
        });
        yield Finance_1.Bill.insertMany(billsWithGroupId);
        const goalsWithGroupId = mockData_1.mockSavingsGoals.map((g) => {
            const { id } = g, rest = __rest(g, ["id"]); // Exclude ID
            return Object.assign(Object.assign({}, rest), { familyGroupId: group._id, startDate: new Date(g.startDate), deadlineDate: g.deadlineDate ? new Date(g.deadlineDate) : undefined });
        });
        yield Finance_1.SavingsGoal.insertMany(goalsWithGroupId);
        console.log('✅ Finance Data Seeded');
        // 6. Seed Health (Profile Specific)
        const medicines = mockData_1.mockMedicines.map((m) => {
            const { id } = m, rest = __rest(m, ["id"]); // Exclude ID
            return Object.assign(Object.assign({}, rest), { memberId: memberMap.get(m.memberId), history: m.history.map(h => (Object.assign(Object.assign({}, h), { timestamp: new Date(h.timestamp) }))) });
        });
        yield Health_1.Medicine.insertMany(medicines);
        const appointments = mockData_1.mockAppointments.map((a) => {
            const { id } = a, rest = __rest(a, ["id"]); // Exclude ID
            return Object.assign(Object.assign({}, rest), { memberId: memberMap.get(a.memberId), dateTime: new Date(a.dateTime) });
        });
        yield Health_1.Appointment.insertMany(appointments);
        console.log('✅ Health Data Seeded');
        // 7. Seed Tasks
        const listMap = new Map();
        for (const mockList of mockData_1.mockTaskLists) {
            const newList = new Task_1.TaskList({
                name: mockList.name,
                familyGroupId: group._id
            });
            yield newList.save();
            listMap.set(mockList.id, newList._id);
        }
        const tasks = mockData_1.mockTasks.map((t) => {
            const { id } = t, rest = __rest(t, ["id"]); // Exclude ID
            return Object.assign(Object.assign({}, rest), { listId: listMap.get(t.listId), dueDate: t.dueDate ? new Date(t.dueDate) : undefined });
        });
        yield Task_1.Task.insertMany(tasks);
        console.log('✅ Task Data Seeded');
        console.log('🚀 Seeding Completed Successfully!');
        process.exit();
    }
    catch (error) {
        console.error('❌ Seeding Failed:', error);
        process.exit(1);
    }
});
seedDB();
