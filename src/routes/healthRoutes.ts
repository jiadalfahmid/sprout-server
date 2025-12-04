import express, { Request, Response } from 'express'; // Added types for clarity
import { authMiddleware } from '../middleware/auth';
import { Medicine } from '../models/Health';
import { FamilyMemberProfile } from '../models/Auth';

const router = express.Router();

// GET Medicines
router.get('/medicines', authMiddleware, async (req: any, res: Response) => {
    try {
        const { role, _id, familyGroupId } = req.user;
        
        let query: any = {};
        
        // Find all profiles in this family
        const familyProfiles = await FamilyMemberProfile.find({ familyGroupId }).select('_id userId');
        const familyProfileIds = familyProfiles.map(p => p._id);

        if (role === 'admin') {
            // Admin sees ALL medicines for the family
            query = { memberId: { $in: familyProfileIds } };
        } else {
            // Member sees ONLY their own medicines
            const myProfile = familyProfiles.find(p => p.userId?.toString() === _id);
            if (!myProfile) return res.status(404).json({ error: 'Profile not found' });
            query = { memberId: myProfile._id };
        }

        const medicines = await Medicine.find(query).populate('memberId', 'name avatar');
        res.json(medicines);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// LOG DOSE (FIXED)
router.patch('/medicines/:id/log', authMiddleware, async (req: any, res: Response) => {
    try {
        const { id } = req.params;
        const { status, timestamp } = req.body; // 'taken', ISOString

        const medicine = await Medicine.findById(id);
        if (!medicine) return res.status(404).json({ error: 'Medicine not found' });

        // Decrement stock if taken
        if (status === 'taken') {
            // FIX: Use (medicine.stock || 0) to handle undefined values
            const currentStock = medicine.stock || 0; 
            medicine.stock = Math.max(0, currentStock - 1);
        }

        medicine.history.push({ timestamp: new Date(timestamp), status });
        await medicine.save();
        
        res.json({ message: 'Dose logged! 💊', stock: medicine.stock });
    } catch (error) {
        res.status(500).json({ error: 'Failed to log dose' });
    }
});

export default router;