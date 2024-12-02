const express = require('express');
const User = require('../models/User');
const authenticateToken = require('../middleware/authMiddleware');
const router = express.Router();

// Add New Habit
router.post('/add', authenticateToken, async (req, res) => {
  try {
    const { name, frequency, startDate } = req.body;
    const user = await User.findById(req.user.id);

    const newHabit = {
      name,
      frequency,
      progress: 0,
      startDate: startDate || new Date()
    };

    user.habits.push(newHabit);
    await user.save();

    res.status(201).json({ 
      message: 'Habit added successfully', 
      habit: newHabit 
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add habit', error: error.message });
  }
});

// Update Habit Progress
router.patch('/progress/:habitId', authenticateToken, async (req, res) => {
  try {
    const { progress } = req.body;
    const user = await User.findById(req.user.id);

    const habit = user.habits.id(req.params.habitId);
    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    habit.progress = Math.min(100, Math.max(0, progress));
    await user.save();

    res.json({ 
      message: 'Habit progress updated', 
      habit 
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update habit progress', error: error.message });
  }
});

// Get User Habits
router.get('/', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({ habits: user.habits });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve habits', error: error.message });
  }
});

module.exports = router;
