import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  CircularProgress,
  TextField,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  LinearProgress,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from '@mui/material';
import {
  Add as AddIcon,
  LocalDrinking as WaterIcon,
  DirectionsRun as ExerciseIcon,
  SelfImprovement as MeditationIcon,
  Restaurant as NutritionIcon,
  EmojiEvents as TrophyIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const HabitTrackerPage = () => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [newValue, setNewValue] = useState('');

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/habits', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setHabits(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch habits:', error);
      setLoading(false);
    }
  };

  const handleAddHabit = () => {
    setSelectedHabit(null);
    setOpenDialog(true);
  };

  const handleSaveHabit = async (habitData) => {
    try {
      const token = localStorage.getItem('token');
      if (selectedHabit) {
        await axios.put(`/api/habits/${selectedHabit._id}`, habitData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post('/api/habits', habitData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      fetchHabits();
      setOpenDialog(false);
    } catch (error) {
      console.error('Failed to save habit:', error);
    }
  };

  const handleLogProgress = async (habit, value) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`/api/habits/${habit._id}/progress`, {
        value: Number(value),
        date: new Date()
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchHabits();
      setNewValue('');
    } catch (error) {
      console.error('Failed to log progress:', error);
    }
  };

  const getHabitIcon = (type) => {
    switch (type) {
      case 'water': return <WaterIcon />;
      case 'exercise': return <ExerciseIcon />;
      case 'meditation': return <MeditationIcon />;
      case 'nutrition': return <NutritionIcon />;
      default: return null;
    }
  };

  const calculateProgress = (habit) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayProgress = habit.completedDates.find(
      entry => new Date(entry.date).setHours(0, 0, 0, 0) === today.getTime()
    );
    return (todayProgress?.value || 0) / habit.target * 100;
  };

  const HabitCard = ({ habit }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card sx={{ height: '100%' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            {getHabitIcon(habit.type)}
            <Typography variant="h6" sx={{ ml: 1 }}>
              {habit.name}
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <LinearProgress 
              variant="determinate" 
              value={calculateProgress(habit)} 
              sx={{ height: 10, borderRadius: 5 }}
            />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Progress: {habit.completedDates[0]?.value || 0}/{habit.target} {habit.unit}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <TextField
              type="number"
              size="small"
              label={`Log ${habit.unit}`}
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              sx={{ mr: 1 }}
            />
            <Button
              variant="contained"
              onClick={() => handleLogProgress(habit, newValue)}
              disabled={!newValue}
            >
              Log
            </Button>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Chip 
              icon={<TrophyIcon />} 
              label={`${habit.streak} day streak`}
              color="primary"
              variant="outlined"
            />
          </Box>

          {habit.badges.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Achievements
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {habit.badges.map((badge, index) => (
                  <Tooltip key={index} title={badge.description}>
                    <Chip
                      label={badge.name}
                      icon={<span>{badge.icon}</span>}
                      size="small"
                      variant="outlined"
                    />
                  </Tooltip>
                ))}
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Habit Tracker
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddHabit}
        >
          Add Habit
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {habits.map((habit) => (
            <Grid item key={habit._id} xs={12} sm={6} md={4}>
              <HabitCard habit={habit} />
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          {selectedHabit ? 'Edit Habit' : 'Add New Habit'}
        </DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <InputLabel id="habit-type-label">Habit Type</InputLabel>
            <Select
              labelId="habit-type-label"
              id="habit-type"
              label="Habit Type"
              value={selectedHabit?.type || ''}
              onChange={(e) => setSelectedHabit({ ...selectedHabit, type: e.target.value })}
            >
              <MenuItem value="water">Water</MenuItem>
              <MenuItem value="exercise">Exercise</MenuItem>
              <MenuItem value="meditation">Meditation</MenuItem>
              <MenuItem value="nutrition">Nutrition</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="normal"
            fullWidth
            id="habit-name"
            label="Habit Name"
            value={selectedHabit?.name || ''}
            onChange={(e) => setSelectedHabit({ ...selectedHabit, name: e.target.value })}
          />
          <TextField
            margin="normal"
            fullWidth
            id="habit-target"
            label="Target"
            type="number"
            value={selectedHabit?.target || ''}
            onChange={(e) => setSelectedHabit({ ...selectedHabit, target: Number(e.target.value) })}
          />
          <TextField
            margin="normal"
            fullWidth
            id="habit-unit"
            label="Unit"
            value={selectedHabit?.unit || ''}
            onChange={(e) => setSelectedHabit({ ...selectedHabit, unit: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={() => handleSaveHabit(selectedHabit)}>Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default HabitTrackerPage;
