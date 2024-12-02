import React from 'react';
import { 
  Box, 
  Button, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent,
  useTheme
} from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import MoodIcon from '@mui/icons-material/Mood';

const FeatureCard = ({ icon, title, description }) => {
  const theme = useTheme();
  
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <Card 
        sx={{ 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column',
          borderRadius: 2,
          boxShadow: 3,
          '&:hover': {
            boxShadow: 6,
          }
        }}
      >
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            {icon}
          </Box>
          <Typography variant="h6" component="h3" gutterBottom align="center">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center">
            {description}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const HomePage = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const features = [
    {
      icon: <FitnessCenterIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: "Personalized Exercise Plans",
      description: "Get AI-powered workout recommendations tailored to your fitness level and goals"
    },
    {
      icon: <RestaurantIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: "Smart Diet Tracking",
      description: "Receive personalized nutrition advice and meal suggestions based on your preferences"
    },
    {
      icon: <MoodIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: "Mood & Habit Tracking",
      description: "Monitor your emotional well-being and build lasting healthy habits"
    }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 8,
          pb: 6,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="sm">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
              sx={{ fontWeight: 'bold' }}
            >
              Transform Your Health with AI-Powered Insights
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Your personal AI wellness companion that helps you achieve your health and fitness goals through personalized recommendations and tracking.
            </Typography>
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/signup')}
                  sx={{
                    borderRadius: 2,
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    textTransform: 'none'
                  }}
                >
                  Get Started Now
                </Button>
              </motion.div>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 8 }} maxWidth="lg">
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <FeatureCard {...feature} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage;
