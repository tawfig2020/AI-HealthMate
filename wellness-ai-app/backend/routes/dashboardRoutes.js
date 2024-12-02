const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const User = require('../models/User');
const router = express.Router();

// Middleware for authentication
const authenticateToken = require('../middleware/authMiddleware');

// Get User Dashboard Data
router.get('/data', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    // Aggregate mood and habit data
    const moodTrends = user.moodTracking.slice(-7);
    const habitProgress = user.habits.map(habit => ({
      name: habit.name,
      progress: habit.progress
    }));

    res.json({
      username: user.username,
      moodTrends,
      habitProgress,
      healthGoals: user.profile.healthGoals
    });
  } catch (error) {
    res.status(500).json({ message: 'Dashboard data retrieval failed', error: error.message });
  }
});

// AI-Powered Health Insights
router.post('/insights', authenticateToken, async (req, res) => {
  try {
    const { userInput } = req.body;
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Generate personalized health insights based on the following user input: ${userInput}. 
    Provide actionable recommendations for wellness, considering physical and mental health.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ insights: text });
  } catch (error) {
    res.status(500).json({ message: 'AI insights generation failed', error: error.message });
  }
});

module.exports = router;
