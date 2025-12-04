"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockNotifications = exports.mockNotes = exports.mockTasks = exports.mockTaskLists = exports.mockAppointments = exports.mockMedicalReports = exports.mockMedicines = exports.mockSavingsGoals = exports.mockLendings = exports.mockBorrowings = exports.mockBills = exports.mockTransactions = exports.mockFamilyMembers = exports.mockUser = void 0;
const types_1 = require("./types");
const uuidv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};
exports.mockUser = {
    name: 'Alex Doe',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
};
const member1Id = uuidv4();
const member2Id = uuidv4();
const member3Id = uuidv4();
const member4Id = uuidv4();
exports.mockFamilyMembers = [
    { id: member1Id, name: 'John Doe', relation: 'Father', age: 52, avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026701d' },
    { id: member2Id, name: 'Jane Doe', relation: 'Mother', age: 48, avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026702d' },
    { id: member3Id, name: 'Alex Doe', relation: 'Self', age: 25, avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
    { id: member4Id, name: 'Emily Doe', relation: 'Sister', age: 22, avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026703d' },
];
const now = new Date();
const year = now.getFullYear();
const month = now.getMonth();
exports.mockTransactions = [
    { id: uuidv4(), description: 'Salary', amount: 4200, type: types_1.TransactionType.INCOME, category: 'Work', date: new Date(year, month, 1).toISOString() },
    { id: uuidv4(), description: 'Groceries from SuperMart', amount: 180.50, type: types_1.TransactionType.EXPENSE, category: 'Groceries', date: new Date(year, month, 3).toISOString() },
    { id: uuidv4(), description: 'Electricity Bill', amount: 75.20, type: types_1.TransactionType.EXPENSE, category: 'Utilities', date: new Date(year, month, 5).toISOString() },
    { id: uuidv4(), description: 'Freelance Project X', amount: 650, type: types_1.TransactionType.INCOME, category: 'Side Hustle', date: new Date(year, month, 8).toISOString() },
    { id: uuidv4(), description: 'Dinner with Friends', amount: 85.00, type: types_1.TransactionType.EXPENSE, category: 'Entertainment', date: new Date(year, month, 10).toISOString() },
    { id: uuidv4(), description: 'New headphones', amount: 120.00, type: types_1.TransactionType.EXPENSE, category: 'Shopping', date: new Date(year, month, 11).toISOString() },
    { id: uuidv4(), description: 'Monthly Transport Pass', amount: 55.00, type: types_1.TransactionType.EXPENSE, category: 'Transport', date: new Date(year, month, 2).toISOString() },
    { id: uuidv4(), description: 'Stock Dividend', amount: 125.00, type: types_1.TransactionType.INCOME, category: 'Investment', date: new Date(year, month, 15).toISOString() },
    { id: uuidv4(), description: 'Deposit to Vacation Fund', amount: 200, type: types_1.TransactionType.EXPENSE, category: 'Savings', date: new Date(year, month, 5).toISOString() },
    { id: uuidv4(), description: 'Repayment to City Bank', amount: 50, type: types_1.TransactionType.EXPENSE, category: 'Debt Repayment', date: new Date(year, month, 1).toISOString() },
];
exports.mockBills = [
    { id: uuidv4(), name: 'Netflix Subscription', amount: 15.99, category: types_1.BillCategory.SUBSCRIPTION, dueDate: new Date(year, month, 15).toISOString(), paid: true, recurrence: 'monthly', paidOn: new Date(year, month, 14).toISOString() },
    { id: uuidv4(), name: 'Apartment Rent', amount: 1200, category: types_1.BillCategory.RENT, dueDate: new Date(year, month + 1, 1).toISOString(), paid: false, recurrence: 'monthly' },
    { id: uuidv4(), name: 'Internet Bill', amount: 60, category: types_1.BillCategory.UTILITIES, dueDate: new Date(year, month, now.getDate() + 2).toISOString(), paid: false, recurrence: 'monthly' },
    { id: uuidv4(), name: 'Gym Membership', amount: 45, category: types_1.BillCategory.SUBSCRIPTION, dueDate: new Date(year, month, now.getDate() - 2).toISOString(), paid: false, recurrence: 'monthly' }, // Overdue
];
exports.mockBorrowings = [
    {
        id: uuidv4(),
        lenderName: 'City Bank',
        amount: 500,
        borrowedDate: new Date(year, month - 1, 15).toISOString(),
        dueDate: new Date(year, month + 2, 15).toISOString(),
        repayments: [{ amount: 50, date: new Date(year, month, 1).toISOString() }],
        status: 'outstanding',
        notes: 'Credit card balance transfer'
    }
];
exports.mockLendings = [
    {
        id: uuidv4(),
        borrowerName: 'Mike Johnson',
        amount: 100,
        lentDate: new Date(year, month, 2).toISOString(),
        returnDate: new Date(year, month, 25).toISOString(),
        returns: [],
        status: 'outstanding',
        notes: 'For lunch last week'
    }
];
exports.mockSavingsGoals = [
    {
        id: uuidv4(),
        title: '🏝️ Bali Vacation Fund',
        targetAmount: 2500,
        currentAmount: 1850,
        startDate: new Date(year, 0, 1).toISOString(),
        deadlineDate: new Date(year, 11, 31).toISOString()
    },
    {
        id: uuidv4(),
        title: '🚨 Emergency Fund',
        targetAmount: 5000,
        currentAmount: 3200,
        startDate: new Date(year - 1, 6, 1).toISOString(),
    }
];
exports.mockMedicines = [
    {
        id: 'med1',
        memberId: member3Id,
        name: 'Roceutane',
        dosage: 30, unit: 'mg',
        doseQuantity: 1, doseForm: 'Tablet',
        stock: 5,
        times: ['19:30'],
        mealRelation: 'after',
        schedule: { type: 'daily' },
        history: [],
        stripPrice: 300,
        piecesPerStrip: 10
    },
    {
        id: 'med2',
        memberId: member3Id,
        name: 'Amoxicillin',
        dosage: 250, unit: 'mg',
        doseQuantity: 1, doseForm: 'Capsule',
        stock: 15,
        times: ['21:30'],
        mealRelation: 'after',
        schedule: { type: 'daily' },
        history: [],
        stripPrice: 200,
        piecesPerStrip: 20
    },
    {
        id: 'med3',
        memberId: member4Id,
        name: 'Ciprofloxacin',
        dosage: 5, unit: 'ml',
        doseQuantity: 4, doseForm: 'Drops',
        stock: 100,
        times: ['21:30'],
        mealRelation: 'before',
        schedule: { type: 'daily' },
        history: [],
        stripPrice: 120,
        piecesPerStrip: 1
    },
    {
        id: 'med4',
        memberId: member1Id,
        name: 'Loratadine',
        dosage: 10, unit: 'ml',
        doseQuantity: 2, doseForm: 'Spoon',
        stock: 20,
        times: ['12:30'],
        mealRelation: 'after',
        schedule: { type: 'daily' },
        history: [],
        stripPrice: 80,
        piecesPerStrip: 1
    },
    {
        id: 'med5',
        memberId: member3Id,
        name: 'Fluoxetine (Prozac)',
        dosage: 20, unit: 'mg',
        doseQuantity: 1, doseForm: 'Tablet',
        stock: 30,
        times: ['07:30'],
        mealRelation: 'after',
        schedule: { type: 'daily' },
        history: [],
        stripPrice: 250,
        piecesPerStrip: 10
    },
    {
        id: 'med6',
        memberId: member2Id,
        name: 'Metformin',
        dosage: 500, unit: 'mg',
        doseQuantity: 1, doseForm: 'Tablet',
        stock: 25,
        times: ['08:00', '20:00'],
        mealRelation: 'after',
        schedule: { type: 'daily' },
        history: [{ timestamp: new Date(new Date().setHours(8, 0, 0, 0)).toISOString(), status: 'taken' }],
        stripPrice: 150,
        piecesPerStrip: 10
    },
];
exports.mockMedicalReports = [
    {
        id: uuidv4(),
        memberId: member1Id, // John Doe
        name: 'Annual Blood Test',
        category: types_1.MedicalReportCategory.LAB_REPORT,
        date: new Date(2023, 8, 15).toISOString(),
        fileUrl: 'https://i.ibb.co/Fz3rP0g/report-placeholder.png'
    },
    {
        id: uuidv4(),
        memberId: member2Id, // Jane Doe
        name: 'Dr. Smith Prescription',
        category: types_1.MedicalReportCategory.PRESCRIPTION,
        date: new Date(2023, 10, 2).toISOString(),
        fileUrl: 'https://i.ibb.co/Fz3rP0g/report-placeholder.png'
    },
    {
        id: uuidv4(),
        memberId: member3Id, // Alex Doe
        name: 'Flu Vaccine Record',
        category: types_1.MedicalReportCategory.VACCINATION,
        date: new Date(2023, 9, 20).toISOString(),
        fileUrl: 'https://i.ibb.co/Fz3rP0g/report-placeholder.png'
    }
];
exports.mockAppointments = [
    {
        id: uuidv4(),
        memberId: member1Id, // John Doe
        doctorName: 'Dr. Evelyn Reed',
        specialization: 'Cardiologist',
        dateTime: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 5, 10, 30).toISOString(),
        clinicName: 'City General Hospital',
        purpose: 'Annual heart check-up',
        status: 'upcoming'
    },
    {
        id: uuidv4(),
        memberId: member4Id, // Emily Doe
        doctorName: 'Dr. Ben Carter',
        specialization: 'Dermatologist',
        dateTime: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 10, 15, 0).toISOString(),
        clinicName: 'Skin Care Clinic',
        purpose: 'Follow-up on skin rash',
        status: 'completed'
    }
];
const groceryListId = uuidv4();
const choreListId = uuidv4();
exports.mockTaskLists = [
    { id: groceryListId, name: 'Groceries' },
    { id: choreListId, name: 'Household Chores' },
];
exports.mockTasks = [
    { id: uuidv4(), content: 'Buy milk and eggs', completed: false, listId: groceryListId },
    { id: uuidv4(), content: 'Pay electricity bill', completed: true, listId: choreListId, dueDate: new Date(new Date().getFullYear(), new Date().getMonth(), 18).toISOString() },
    { id: uuidv4(), content: 'Bread', completed: false, listId: groceryListId },
    { id: uuidv4(), content: 'Clean the bathroom', completed: false, listId: choreListId, dueDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 2).toISOString() },
];
exports.mockNotes = [
    { id: uuidv4(), content: 'Remember to call the plumber about the leaky faucet.', createdAt: new Date().toISOString() },
    { id: uuidv4(), content: 'Book flights for vacation.', createdAt: new Date().toISOString() },
];
exports.mockNotifications = [
    {
        id: 'system-welcome',
        message: 'Welcome to Sprout! Explore the app to manage your family life.',
        type: 'success',
        domain: 'system',
        read: false,
        createdAt: new Date().toISOString(),
        path: '/home'
    },
];
