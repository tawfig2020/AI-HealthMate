const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['water', 'exercise', 'meditation', 'sleep', 'nutrition', 'custom']
  },
  target: {
    type: Number,
    required: true
  },
  unit: {
    type: String,
    required: true
  },
  frequency: {
    type: String,
    required: true,
    enum: ['daily', 'weekly']
  },
  streak: {
    type: Number,
    default: 0
  },
  completedDates: [{
    date: {
      type: Date,
      required: true
    },
    value: {
      type: Number,
      required: true
    }
  }],
  badges: [{
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    earnedDate: {
      type: Date,
      default: Date.now
    },
    icon: {
      type: String,
      required: true
    }
  }]
});

// Index for efficient querying
habitSchema.index({ user: 1, type: 1 });
habitSchema.index({ user: 1, 'completedDates.date': -1 });

// Method to update streak
habitSchema.methods.updateStreak = function() {
  const dates = this.completedDates.map(entry => entry.date);
  dates.sort((a, b) => b - a); // Sort in descending order

  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < dates.length; i++) {
    const currentDate = new Date(dates[i]);
    currentDate.setHours(0, 0, 0, 0);

    if (i === 0) {
      // Check if the most recent entry is from today or yesterday
      const diffDays = Math.floor((today - currentDate) / (1000 * 60 * 60 * 24));
      if (diffDays > 1) break;
      streak++;
      continue;
    }

    const prevDate = new Date(dates[i - 1]);
    prevDate.setHours(0, 0, 0, 0);

    // Check if dates are consecutive
    const diffDays = Math.floor((prevDate - currentDate) / (1000 * 60 * 60 * 24));
    if (diffDays === 1) {
      streak++;
    } else {
      break;
    }
  }

  this.streak = streak;
  return streak;
};

// Method to check and award badges
habitSchema.methods.checkBadges = function() {
  const newBadges = [];

  // Streak badges
  if (this.streak >= 7 && !this.badges.find(b => b.name === 'Week Warrior')) {
    newBadges.push({
      name: 'Week Warrior',
      description: 'Maintained a 7-day streak',
      icon: '🏅'
    });
  }
  if (this.streak >= 30 && !this.badges.find(b => b.name === 'Monthly Master')) {
    newBadges.push({
      name: 'Monthly Master',
      description: 'Maintained a 30-day streak',
      icon: '🏆'
    });
  }

  // Achievement badges
  const totalCompletions = this.completedDates.length;
  if (totalCompletions >= 10 && !this.badges.find(b => b.name === 'Getting Started')) {
    newBadges.push({
      name: 'Getting Started',
      description: 'Completed habit 10 times',
      icon: '⭐'
    });
  }
  if (totalCompletions >= 50 && !this.badges.find(b => b.name === 'Habit Master')) {
    newBadges.push({
      name: 'Habit Master',
      description: 'Completed habit 50 times',
      icon: '👑'
    });
  }

  // Add new badges
  if (newBadges.length > 0) {
    this.badges.push(...newBadges);
  }

  return newBadges;
};

module.exports = mongoose.model('Habit', habitSchema);
