import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, FamilyGroup, FamilyMemberProfile } from '../models/Auth';

const router = express.Router();

// Register Main Admin
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // 1. Create User
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    
    const newUser = new User({
        name, 
        email, 
        passwordHash, 
        role: 'admin', 
        avatar: 'https://i.pravatar.cc/150' 
    });
    
    // 2. Create Family Group
    const newGroup = new FamilyGroup({
        name: `${name}'s Family`,
        adminId: newUser._id,
        members: []
    });
    
    // 3. Create Admin's Profile in the Group
    const adminProfile = new FamilyMemberProfile({
        userId: newUser._id,
        familyGroupId: newGroup._id,
        name: name,
        relation: 'Self',
        age: 30, // Default
        avatar: newUser.avatar
    });

    await adminProfile.save();
    
    // Link everything
    newGroup.members.push(adminProfile._id);
    newUser.familyGroupId = newGroup._id;
    
    await newGroup.save();
    await newUser.save();

    res.status(201).json({ message: 'Family created successfully 👨‍👩‍👧‍👦' });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'Invalid credentials' });

        const validPass = await bcrypt.compare(password, user.passwordHash);
        if (!validPass) return res.status(400).json({ error: 'Invalid credentials' });

        const token = jwt.sign(
            { _id: user._id, role: user.role, familyGroupId: user.familyGroupId }, 
            process.env.JWT_SECRET as string
        );
        res.json({ token, user: { name: user.name, role: user.role } });
    } catch (err) {
        res.status(500).json({ error: 'Login error' });
    }
});

export default router;