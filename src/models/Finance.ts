import mongoose, { Schema } from 'mongoose';

const TransactionSchema = new Schema({
  familyGroupId: { type: Schema.Types.ObjectId, ref: 'FamilyGroup', required: true },
  description: String,
  amount: Number,
  type: { type: String, enum: ['income', 'expense'] },
  category: String,
  date: Date
});

const BillSchema = new Schema({
  familyGroupId: { type: Schema.Types.ObjectId, ref: 'FamilyGroup', required: true },
  name: String,
  amount: Number,
  category: String,
  dueDate: Date,
  paid: { type: Boolean, default: false },
  recurrence: String,
  paidOn: Date
});

const SavingsGoalSchema = new Schema({
  familyGroupId: { type: Schema.Types.ObjectId, ref: 'FamilyGroup', required: true },
  title: String,
  targetAmount: Number,
  currentAmount: Number,
  startDate: Date,
  deadlineDate: Date
});

export const Transaction = mongoose.model('Transaction', TransactionSchema);
export const Bill = mongoose.model('Bill', BillSchema);
export const SavingsGoal = mongoose.model('SavingsGoal', SavingsGoalSchema);