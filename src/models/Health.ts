import mongoose, { Schema } from 'mongoose';

const MedicineSchema = new Schema({
  memberId: { type: Schema.Types.ObjectId, ref: 'FamilyMemberProfile', required: true },
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

const AppointmentSchema = new Schema({
  memberId: { type: Schema.Types.ObjectId, ref: 'FamilyMemberProfile', required: true },
  doctorName: String,
  specialization: String,
  dateTime: Date,
  clinicName: String,
  purpose: String,
  status: { type: String, enum: ['upcoming', 'completed', 'cancelled'], default: 'upcoming' }
});

const MedicalReportSchema = new Schema({
  memberId: { type: Schema.Types.ObjectId, ref: 'FamilyMemberProfile', required: true },
  name: String,
  category: String,
  date: Date,
  fileUrl: String
});

export const Medicine = mongoose.model('Medicine', MedicineSchema);
export const Appointment = mongoose.model('Appointment', AppointmentSchema);
export const MedicalReport = mongoose.model('MedicalReport', MedicalReportSchema);