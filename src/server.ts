import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
// ... imports of your routes

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// app.use('/api/auth', authRoutes);
// ... your other routes

// Health Check Route (Important for Vercel)
app.get('/', (req, res) => {
  res.send('Sprout API is running! 🌱');
});

// Database Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('MongoDB Connected');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

// Connect to DB immediately
connectDB();

// Server Logic
const PORT = process.env.PORT || 5000;

// Only listen if running locally (Vercel manages the port automatically)
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// EXPORT THE APP FOR VERCEL
export default app;