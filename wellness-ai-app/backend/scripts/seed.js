const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import models
const User = require('../models/User');
const Habit = require('../models/Habit');
const MoodEntry = require('../models/MoodEntry');

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Habit.deleteMany({});
    await MoodEntry.deleteMany({});

    // Create a sample user
    const hashedPassword = await bcrypt.hash('password123', 10);
    const user = await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: hashedPassword,
      age: 30,
      height: 175,
      weight: 70,
      preferences: {
        dietaryRestrictions: ['vegetarian'],
        fitnessLevel: 'intermediate',
        goals: ['weight_loss', 'stress_reduction']
      }
    });

    // Create sample habits
    const habits = await Habit.create([
      {
        userId: user._id,
        name: 'Daily Exercise',
        type: 'exercise',
        frequency: 'daily',
        targetValue: 30,
        unit: 'minutes',
        streak: 5,
        progress: [
          { date: new Date(), value: 30, completed: true },
          { date: new Date(Date.now() - 86400000), value: 45, completed: true }
        ]
      },
      {
        userId: user._id,
        name: 'Water Intake',
        type: 'hydration',
        frequency: 'daily',
        targetValue: 8,
        unit: 'glasses',
        streak: 3,
        progress: [
          { date: new Date(), value: 6, completed: false },
          { date: new Date(Date.now() - 86400000), value: 8, completed: true }
        ]
      },
      {
        userId: user._id,
        name: 'Meditation',
        type: 'mindfulness',
        frequency: 'daily',
        targetValue: 15,
        unit: 'minutes',
        streak: 2,
        progress: [
          { date: new Date(), value: 15, completed: true },
          { date: new Date(Date.now() - 86400000), value: 10, completed: true }
        ]
      }
    ]);

    // Create sample mood entries
    const moodEntries = await MoodEntry.create([
      {
        userId: user._id,
        mood: 'happy',
        intensity: 8,
        notes: 'Had a great workout session',
        activities: ['exercise', 'meditation'],
        date: new Date()
      },
      {
        userId: user._id,
        mood: 'calm',
        intensity: 7,
        notes: 'Peaceful meditation session',
        activities: ['meditation'],
        date: new Date(Date.now() - 86400000)
      },
      {
        userId: user._id,
        mood: 'energetic',
        intensity: 9,
        notes: 'Morning run was refreshing',
        activities: ['exercise'],
        date: new Date(Date.now() - 172800000)
      }
    ]);

    console.log('Sample data created successfully');
    console.log('Sample user credentials:');
    console.log('Email: john@example.com');
    console.log('Password: password123');

    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
