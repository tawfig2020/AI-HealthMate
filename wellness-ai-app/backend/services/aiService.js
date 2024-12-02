const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const generateHealthInsights = async (userProfile) => {
  try {
    const prompt = `
    As a wellness AI advisor, provide personalized health recommendations based on the following user profile:
    Age: ${userProfile.age}
    Weight: ${userProfile.weight}kg
    Height: ${userProfile.height}cm
    Diet: ${userProfile.dietaryPreference}
    Stress Level: ${userProfile.stressLevel}/10
    Current Mood: ${userProfile.mood}
    Activity Level: ${userProfile.activityLevel}
    Sleep Hours: ${userProfile.sleepHours}

    Please provide specific, actionable recommendations for:
    1. Exercise routine
    2. Diet suggestions (considering their dietary preference)
    3. Stress management techniques
    4. Sleep optimization
    
    Format the response in JSON with the following structure:
    {
      "exercise": "recommendation",
      "diet": "recommendation",
      "mindfulness": "recommendation",
      "sleep": "recommendation"
    }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return JSON.parse(response.text());
  } catch (error) {
    console.error('AI generation error:', error);
    throw new Error('Failed to generate health insights');
  }
};

const analyzeMoodTrends = async (moodData) => {
  try {
    const prompt = `
    Analyze the following mood data and provide insights:
    ${JSON.stringify(moodData)}
    
    Please provide:
    1. Pattern recognition
    2. Potential triggers
    3. Improvement suggestions
    
    Format the response in JSON.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return JSON.parse(response.text());
  } catch (error) {
    console.error('Mood analysis error:', error);
    throw new Error('Failed to analyze mood trends');
  }
};

module.exports = {
  generateHealthInsights,
  analyzeMoodTrends
};
