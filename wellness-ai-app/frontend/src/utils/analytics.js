// Analytics utility functions
export const trackPageView = (path) => {
  if (window.gtag) {
    window.gtag('config', process.env.REACT_APP_GA_TRACKING_ID, {
      page_path: path,
    });
  }
};

export const trackEvent = (category, action, label = null, value = null) => {
  if (window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Custom events for our wellness app
export const trackHabitCompletion = (habitName) => {
  trackEvent('Habits', 'completion', habitName);
};

export const trackMoodEntry = (moodScore) => {
  trackEvent('Mood', 'entry', 'score', moodScore);
};

export const trackAIRecommendationInteraction = (recommendationType, action) => {
  trackEvent('AI_Recommendations', action, recommendationType);
};

export const trackStreakAchievement = (streakCount, habitName) => {
  trackEvent('Achievements', 'streak_milestone', habitName, streakCount);
};

export const trackFeatureUsage = (featureName) => {
  trackEvent('Feature_Usage', 'interaction', featureName);
};

export const trackErrorOccurrence = (errorType, errorMessage) => {
  trackEvent('Errors', errorType, errorMessage);
};

// User engagement metrics
export const trackSessionDuration = (durationInSeconds) => {
  trackEvent('Engagement', 'session_duration', null, durationInSeconds);
};

export const trackUserAction = (actionType, details) => {
  trackEvent('User_Actions', actionType, details);
};
