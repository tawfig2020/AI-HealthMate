import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  useTheme,
  alpha
} from '@mui/material';
import { motion } from 'framer-motion';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import MoodIcon from '@mui/icons-material/Mood';
import TimelineIcon from '@mui/icons-material/Timeline';
import SmartToyIcon from '@mui/icons-material/SmartToy';

const MotionBox = motion(Box);
const MotionTypography = motion(Typography);
const MotionButton = motion(Button);

const LandingPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const features = [
    {
      icon: <SmartToyIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: 'AI-Powered Insights',
      description: 'Get personalized recommendations based on your health data and goals'
    },
    {
      icon: <MoodIcon sx={{ fontSize: 40, color: theme.palette.secondary.main }} />,
      title: 'Mood Tracking',
      description: 'Track your emotional well-being and discover patterns over time'
    },
    {
      icon: <TimelineIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: 'Progress Analytics',
      description: 'Visualize your wellness journey with detailed analytics and insights'
    },
    {
      icon: <FitnessCenterIcon sx={{ fontSize: 40, color: theme.palette.secondary.main }} />,
      title: 'Habit Building',
      description: 'Build lasting healthy habits with our gamified tracking system'
    }
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(45deg, ${alpha(theme.palette.primary.main, 0.05)}, ${alpha(
            theme.palette.secondary.main,
            0.05
          )})`,
          pt: { xs: 8, md: 12 },
          pb: { xs: 8, md: 12 },
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <MotionBox
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <MotionTypography
                  variant="h1"
                  gutterBottom
                  className="gradient-text"
                  sx={{ fontWeight: 700, mb: 2 }}
                >
                  Transform Your Health with AI-Powered Insights
                </MotionTypography>
                <Typography
                  variant="h5"
                  color="text.secondary"
                  sx={{ mb: 4, fontWeight: 400 }}
                >
                  Your personal AI wellness companion for building better habits and achieving your health goals.
                </Typography>
                <MotionButton
                  variant="contained"
                  size="large"
                  color="primary"
                  onClick={() => navigate('/register')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  sx={{ mr: 2 }}
                >
                  Get Started
                </MotionButton>
                <MotionButton
                  variant="outlined"
                  size="large"
                  color="primary"
                  onClick={() => navigate('/login')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sign In
                </MotionButton>
              </MotionBox>
            </Grid>
            <Grid item xs={12} md={6}>
              <MotionBox
                component="img"
                src="/hero-image.png"
                alt="Wellness Dashboard"
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '24px',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Typography
          variant="h2"
          align="center"
          gutterBottom
          sx={{ mb: 8 }}
          className="gradient-text"
        >
          Features that Empower You
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    p: 3
                  }}
                >
                  <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </MotionBox>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default LandingPage;
