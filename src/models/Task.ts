import mongoose, { Schema, Document } from 'mongoose';

// 1. Task List (Categories like "Groceries", "Chores")
export interface ITaskList extends Document {
  name: string;
  familyGroupId: mongoose.Types.ObjectId;
}

const TaskListSchema = new Schema({
  name: { type: String, required: true },
  familyGroupId: { type: Schema.Types.ObjectId, ref: 'FamilyGroup', required: true }
});

export const TaskList = mongoose.model<ITaskList>('TaskList', TaskListSchema);

// 2. Task Item
export interface ITask extends Document {
  listId: mongoose.Types.ObjectId;
  content: string;
  completed: boolean;
  dueDate?: Date;
  assignedTo?: mongoose.Types.ObjectId;
}

const TaskSchema = new Schema({
  listId: { type: Schema.Types.ObjectId, ref: 'TaskList', required: true },
  content: { type: String, required: true },
  completed: { type: Boolean, default: false },
  dueDate: Date,
  assignedTo: { type: Schema.Types.ObjectId, ref: 'FamilyMemberProfile' }
});

export const Task = mongoose.model<ITask>('Task', TaskSchema);