import mongoose, { Schema, Document } from 'mongoose';

// 1. User (Login Account)
export interface IUser extends Document {
  email: string;
  passwordHash: string;
  name: string;
  avatar: string;
  role: 'admin' | 'member';
  familyGroupId: mongoose.Types.ObjectId;
}

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  name: { type: String, required: true },
  avatar: { type: String },
  role: { type: String, enum: ['admin', 'member'], default: 'member' },
  familyGroupId: { type: Schema.Types.ObjectId, ref: 'FamilyGroup' }
}, { timestamps: true });

export const User = mongoose.model<IUser>('User', UserSchema);

// 2. Family Group
export interface IFamilyGroup extends Document {
  name: string;
  adminId: mongoose.Types.ObjectId;
  members: mongoose.Types.ObjectId[];
}

const FamilyGroupSchema = new Schema({
  name: { type: String, required: true },
  adminId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'FamilyMemberProfile' }]
}, { timestamps: true });

export const FamilyGroup = mongoose.model<IFamilyGroup>('FamilyGroup', FamilyGroupSchema);

// 3. Family Member Profile (The Data Entity)
export interface IFamilyMemberProfile extends Document {
  userId?: mongoose.Types.ObjectId; // Linked if they have a login
  familyGroupId: mongoose.Types.ObjectId;
  name: string;
  relation: string;
  age: number;
  avatar: string;
}

const FamilyMemberProfileSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  familyGroupId: { type: Schema.Types.ObjectId, ref: 'FamilyGroup', required: true },
  name: { type: String, required: true },
  relation: { type: String, required: true },
  age: { type: Number },
  avatar: { type: String }
});

export const FamilyMemberProfile = mongoose.model<IFamilyMemberProfile>('FamilyMemberProfile', FamilyMemberProfileSchema);