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
exports.MedicalReport = exports.Appointment = exports.Medicine = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const MedicineSchema = new mongoose_1.Schema({
    memberId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'FamilyMemberProfile', required: true },
    name: String,
    dosage: Number,
    unit: String,
    doseQuantity: Number,
    doseForm: String,
    stock: Number,
    times: [String],
    mealRelation: String,
    schedule: {
        type: { type: String, enum: ['daily', 'alternate_days', 'specific_days'] },
        days: [Number]
    },
    history: [{
            timestamp: Date,
            status: { type: String, enum: ['taken', 'missed', 'upcoming'] }
        }],
    stripPrice: Number,
    piecesPerStrip: Number
});
const AppointmentSchema = new mongoose_1.Schema({
    memberId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'FamilyMemberProfile', required: true },
    doctorName: String,
    specialization: String,
    dateTime: Date,
    clinicName: String,
    purpose: String,
    status: { type: String, enum: ['upcoming', 'completed', 'cancelled'], default: 'upcoming' }
});
const MedicalReportSchema = new mongoose_1.Schema({
    memberId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'FamilyMemberProfile', required: true },
    name: String,
    category: String,
    date: Date,
    fileUrl: String
});
exports.Medicine = mongoose_1.default.model('Medicine', MedicineSchema);
exports.Appointment = mongoose_1.default.model('Appointment', AppointmentSchema);
exports.MedicalReport = mongoose_1.default.model('MedicalReport', MedicalReportSchema);
