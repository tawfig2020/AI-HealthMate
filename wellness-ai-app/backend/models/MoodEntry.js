const mongoose = require('mongoose');

const moodEntrySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  mood: {
    type: String,
    required: true,
    enum: ['happy', 'calm', 'neutral', 'stressed', 'sad']
  },
  intensity: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },
  notes: {
    type: String,
    maxLength: 500
  },
  activities: [{
    type: String,
    enum: ['exercise', 'work', 'social', 'relaxation', 'family', 'hobbies']
  }],
  timestamp: {
    type: Date,
    default: Date.now
  }
});

// Index for efficient querying of user's mood entries
moodEntrySchema.index({ user: 1, timestamp: -1 });

module.exports = mongoose.model('MoodEntry', moodEntrySchema);
