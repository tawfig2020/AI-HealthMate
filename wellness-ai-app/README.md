# WellnessAI: Personalized Health & Lifestyle Improvement Platform

## Overview
WellnessAI is an advanced, AI-powered web application designed to help users improve their health and lifestyle through personalized insights, habit tracking, and mood monitoring.

## Tech Stack
- **Frontend**: React.js
- **Backend**: Node.js with Express
- **Database**: MongoDB
- **AI Integration**: Google Gemini Nano API
- **Authentication**: JWT
- **Styling**: Material-UI

## Features
- User Registration & Authentication
- Personalized Dashboard
- AI-Powered Health Insights
- Habit Tracking & Gamification
- Mood Trend Visualization
- Responsive Design

## Prerequisites
- Node.js (v16+)
- MongoDB
- Google Cloud Account (for Gemini API)

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/wellness-ai.git
cd wellness-ai
```

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Configure your .env file with MongoDB and Gemini API credentials
npm start
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm start
```

## Environment Variables
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT authentication
- `GEMINI_API_KEY`: Google Gemini API key
- `PORT`: Backend server port

## Deployment
Configured for Google Cloud Platform with HTTPS support

## Contributing
Please read CONTRIBUTING.md for details on our code of conduct and the process for submitting pull requests.

## License
This project is licensed under the MIT License - see the LICENSE.md file for details
