import React from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  useTheme,
  LinearProgress,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import { motion } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const MotionCard = motion(Card);

const DashboardPage = () => {
  const theme = useTheme();

  // Mock data for mood tracking chart
  const moodData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Mood Level',
        data: [8, 7, 6, 8, 9, 8, 7],
        fill: true,
        backgroundColor: theme.palette.primary.light + '40',
        borderColor: theme.palette.primary.main,
        tension: 0.4
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        mode: 'index',
        intersect: false
      }
    },
    scales: {
      y: {
        min: 0,
        max: 10,
        grid: {
          display: false
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    },
    maintainAspectRatio: false
  };

  // Mock AI recommendations
  const recommendations = [
    {
      icon: <FitnessCenterIcon color="primary" />,
      title: 'Exercise',
      recommendation: 'Try a 20-minute HIIT workout today to boost your energy levels'
    },
    {
      icon: <RestaurantIcon color="primary" />,
      title: 'Nutrition',
      recommendation: 'Include more leafy greens in your lunch for increased vitamin intake'
    },
    {
      icon: <SelfImprovementIcon color="primary" />,
      title: 'Mindfulness',
      recommendation: '5-minute meditation session to reduce stress levels'
    }
  ];

  // Mock habit progress data
  const habits = [
    {
      name: 'Daily Exercise',
      progress: 80,
      streak: 5,
      color: theme.palette.primary.main
    },
    {
      name: 'Meditation',
      progress: 60,
      streak: 3,
      color: theme.palette.secondary.main
    },
    {
      name: 'Water Intake',
      progress: 90,
      streak: 7,
      color: theme.palette.info.main
    }
  ];

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* AI Recommendations Section */}
          <Grid item xs={12} md={4}>
            <MotionCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              sx={{ height: '100%' }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom className="gradient-text">
                  Today's Recommendations
                </Typography>
                <List>
                  {recommendations.map((item, index) => (
                    <React.Fragment key={index}>
                      <ListItem alignItems="flex-start">
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText
                          primary={item.title}
                          secondary={item.recommendation}
                          primaryTypographyProps={{ fontWeight: 500 }}
                        />
                      </ListItem>
                      {index < recommendations.length - 1 && <Divider variant="inset" component="li" />}
                    </React.Fragment>
                  ))}
                </List>
              </CardContent>
            </MotionCard>
          </Grid>

          {/* Mood Tracking Section */}
          <Grid item xs={12} md={4}>
            <MotionCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              sx={{ height: '100%' }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom className="gradient-text">
                  Mood Tracking
                </Typography>
                <Box sx={{ height: 300, mt: 2 }}>
                  <Line data={moodData} options={chartOptions} />
                </Box>
              </CardContent>
            </MotionCard>
          </Grid>

          {/* Habit Progress Section */}
          <Grid item xs={12} md={4}>
            <MotionCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              sx={{ height: '100%' }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom className="gradient-text">
                  Habit Progress
                </Typography>
                <Box sx={{ mt: 2 }}>
                  {habits.map((habit, index) => (
                    <Box key={index} sx={{ mb: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body1" fontWeight={500}>
                          {habit.name}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <EmojiEventsIcon sx={{ color: 'warning.main', mr: 0.5 }} />
                          <Typography variant="body2" color="text.secondary">
                            {habit.streak} day streak
                          </Typography>
                        </Box>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={habit.progress}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          bgcolor: habit.color + '20',
                          '& .MuiLinearProgress-bar': {
                            bgcolor: habit.color
                          }
                        }}
                      />
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </MotionCard>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default DashboardPage;
