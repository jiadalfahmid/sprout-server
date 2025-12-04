import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { User, FamilyGroup, FamilyMemberProfile } from '../models/Auth';
import { Transaction, Bill, SavingsGoal } from '../models/Finance';
import { Medicine, Appointment } from '../models/Health';
import { TaskList, Task } from '../models/Task';

// Import data
import { 
    mockUser, 
    mockFamilyMembers, 
    mockTransactions, 
    mockBills, 
    mockMedicines, 
    mockAppointments, 
    mockTaskLists, 
    mockTasks,
    mockSavingsGoals 
} from './mockData'; 

dotenv.config();

const seedDB = async () => {
  if (!process.env.MONGO_URI) {
      console.error('❌ MONGO_URI is missing in .env file');
      process.exit(1);
  }

  try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log('🌱 Connected to DB for Seeding...');

      // 1. Clear existing data
      await User.deleteMany({});
      await FamilyGroup.deleteMany({});
      await FamilyMemberProfile.deleteMany({});
      await Transaction.deleteMany({});
      await Bill.deleteMany({});
      await Medicine.deleteMany({});
      await Appointment.deleteMany({});
      await TaskList.deleteMany({});
      await Task.deleteMany({});
      await SavingsGoal.deleteMany({});

      // 2. Create Admin User
      const admin = new User({
        name: mockUser.name,
        email: 'alex@sprout.com',
        passwordHash: '$2a$10$abcdefg...', // Mock hash
        role: 'admin',
        avatar: mockUser.avatar
      });

      // 3. Create Family Group
      const group = new FamilyGroup({
        name: 'The Doe Family',
        adminId: admin._id,
        members: []
      });

      await group.save();
      admin.familyGroupId = group._id;
      await admin.save();

      // 4. Create Profiles & Map UUIDs
      // Map<MockUUID, MongoObjectId>
      const memberMap = new Map<string, mongoose.Types.ObjectId>();

      for (const mockMember of mockFamilyMembers) {
        const profile = new FamilyMemberProfile({
            familyGroupId: group._id,
            name: mockMember.name,
            relation: mockMember.relation,
            age: mockMember.age,
            avatar: mockMember.avatar
        });

        if (mockMember.relation === 'Self') {
            profile.userId = admin._id;
        }

        await profile.save();
        memberMap.set(mockMember.id, profile._id);
        group.members.push(profile._id);
      }
      await group.save();

      console.log('✅ Family & Profiles Created');

      // 5. Seed Finance (Shared) - FIX: Remove 'id' from mock objects
      const transactionsWithGroupId = mockTransactions.map((t) => {
          const { id, ...rest } = t; // Exclude ID
          return {
            ...rest,
            familyGroupId: group._id,
            date: new Date(t.date)
          };
      });
      await Transaction.insertMany(transactionsWithGroupId);

      const billsWithGroupId = mockBills.map((b) => {
          const { id, ...rest } = b; // Exclude ID
          return {
            ...rest,
            familyGroupId: group._id,
            dueDate: new Date(b.dueDate),
            paidOn: b.paidOn ? new Date(b.paidOn) : undefined
          };
      });
      await Bill.insertMany(billsWithGroupId);

      const goalsWithGroupId = mockSavingsGoals.map((g) => {
          const { id, ...rest } = g; // Exclude ID
          return {
            ...rest,
            familyGroupId: group._id,
            startDate: new Date(g.startDate),
            deadlineDate: g.deadlineDate ? new Date(g.deadlineDate) : undefined
          };
      });
      await SavingsGoal.insertMany(goalsWithGroupId);

      console.log('✅ Finance Data Seeded');

      // 6. Seed Health (Profile Specific)
      const medicines = mockMedicines.map((m) => {
          const { id, ...rest } = m; // Exclude ID
          return {
            ...rest,
            memberId: memberMap.get(m.memberId),
            history: m.history.map(h => ({ ...h, timestamp: new Date(h.timestamp) }))
          };
      });
      await Medicine.insertMany(medicines);

      const appointments = mockAppointments.map((a) => {
          const { id, ...rest } = a; // Exclude ID
          return {
            ...rest,
            memberId: memberMap.get(a.memberId),
            dateTime: new Date(a.dateTime)
          };
      });
      await Appointment.insertMany(appointments);

      console.log('✅ Health Data Seeded');

      // 7. Seed Tasks
      const listMap = new Map<string, mongoose.Types.ObjectId>();
      
      for (const mockList of mockTaskLists) {
          const newList = new TaskList({
              name: mockList.name,
              familyGroupId: group._id
          });
          await newList.save();
          listMap.set(mockList.id, newList._id);
      }

      const tasks = mockTasks.map((t) => {
          const { id, ...rest } = t; // Exclude ID
          return {
            ...rest,
            listId: listMap.get(t.listId),
            dueDate: t.dueDate ? new Date(t.dueDate) : undefined
          };
      });
      await Task.insertMany(tasks);

      console.log('✅ Task Data Seeded');
      
      console.log('🚀 Seeding Completed Successfully!');
      process.exit();

  } catch (error) {
      console.error('❌ Seeding Failed:', error);
      process.exit(1);
  }
};

seedDB();