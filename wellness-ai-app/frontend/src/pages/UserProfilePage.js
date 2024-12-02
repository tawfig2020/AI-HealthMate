import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Slider,
  Grid,
  Button,
  Box,
  ToggleButton,
  ToggleButtonGroup,
  FormControl,
  InputLabel,
  Select,
  FormHelperText
} from '@mui/material';
import { motion } from 'framer-motion';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Emoji constants for mood selection
const MOOD_OPTIONS = [
  { emoji: '😊', label: 'Happy', value: 'happy' },
  { emoji: '😌', label: 'Calm', value: 'calm' },
  { emoji: '😐', label: 'Neutral', value: 'neutral' },
  { emoji: '😕', label: 'Stressed', value: 'stressed' },
  { emoji: '😢', label: 'Sad', value: 'sad' }
];

const DIETARY_PREFERENCES = [
  'No Restrictions',
  'Vegetarian',
  'Vegan',
  'Keto',
  'Paleo',
  'Mediterranean',
  'Gluten-Free',
  'Dairy-Free',
  'Low-Carb'
];

const UserProfilePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Load existing profile data if available
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        formik.setValues(response.data);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };
    fetchProfile();
  }, []);

  const validationSchema = Yup.object({
    age: Yup.number()
      .required('Age is required')
      .min(13, 'Must be at least 13 years old')
      .max(120, 'Please enter a valid age'),
    weight: Yup.number()
      .required('Weight is required')
      .min(30, 'Please enter a valid weight')
      .max(300, 'Please enter a valid weight'),
    height: Yup.number()
      .required('Height is required')
      .min(100, 'Please enter a valid height in cm')
      .max(250, 'Please enter a valid height in cm'),
    dietaryPreference: Yup.string()
      .required('Please select your dietary preference'),
    stressLevel: Yup.number()
      .required('Please indicate your stress level'),
    mood: Yup.string()
      .required('Please select your current mood'),
    activityLevel: Yup.string()
      .required('Please select your activity level'),
    sleepHours: Yup.number()
      .required('Please enter your average sleep hours')
      .min(3, 'Please enter a valid number of hours')
      .max(12, 'Please enter a valid number of hours')
  });

  const formik = useFormik({
    initialValues: {
      age: '',
      weight: '',
      height: '',
      dietaryPreference: '',
      stressLevel: 5,
      mood: '',
      activityLevel: '',
      sleepHours: '',
      healthGoals: []
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        await axios.post('/api/profile', values, {
          headers: { Authorization: `Bearer ${token}` }
        });
        navigate('/dashboard');
      } catch (error) {
        console.error('Profile update failed:', error);
      } finally {
        setLoading(false);
      }
    }
  });

  const MotionPaper = motion(Paper);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <MotionPaper
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        elevation={3}
        sx={{ p: 4, borderRadius: 2 }}
      >
        <Typography variant="h4" gutterBottom align="center">
          Your Wellness Profile
        </Typography>
        <Typography variant="body1" color="textSecondary" align="center" sx={{ mb: 4 }}>
          Help us personalize your wellness journey by providing some information about yourself.
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            {/* Basic Information */}
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                id="age"
                name="age"
                label="Age"
                type="number"
                value={formik.values.age}
                onChange={formik.handleChange}
                error={formik.touched.age && Boolean(formik.errors.age)}
                helperText={formik.touched.age && formik.errors.age}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                id="weight"
                name="weight"
                label="Weight (kg)"
                type="number"
                value={formik.values.weight}
                onChange={formik.handleChange}
                error={formik.touched.weight && Boolean(formik.errors.weight)}
                helperText={formik.touched.weight && formik.errors.weight}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                id="height"
                name="height"
                label="Height (cm)"
                type="number"
                value={formik.values.height}
                onChange={formik.handleChange}
                error={formik.touched.height && Boolean(formik.errors.height)}
                helperText={formik.touched.height && formik.errors.height}
              />
            </Grid>

            {/* Dietary Preferences */}
            <Grid item xs={12}>
              <FormControl fullWidth error={formik.touched.dietaryPreference && Boolean(formik.errors.dietaryPreference)}>
                <InputLabel>Dietary Preference</InputLabel>
                <Select
                  name="dietaryPreference"
                  value={formik.values.dietaryPreference}
                  onChange={formik.handleChange}
                  label="Dietary Preference"
                >
                  {DIETARY_PREFERENCES.map((diet) => (
                    <MenuItem key={diet} value={diet}>
                      {diet}
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.dietaryPreference && formik.errors.dietaryPreference && (
                  <FormHelperText>{formik.errors.dietaryPreference}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            {/* Stress Level Slider */}
            <Grid item xs={12}>
              <Typography gutterBottom>
                Stress Level
              </Typography>
              <Slider
                name="stressLevel"
                value={formik.values.stressLevel}
                onChange={(_, value) => formik.setFieldValue('stressLevel', value)}
                min={1}
                max={10}
                marks
                valueLabelDisplay="auto"
                aria-label="Stress Level"
              />
            </Grid>

            {/* Mood Selection */}
            <Grid item xs={12}>
              <Typography gutterBottom>
                Current Mood
              </Typography>
              <ToggleButtonGroup
                value={formik.values.mood}
                exclusive
                onChange={(_, value) => formik.setFieldValue('mood', value)}
                aria-label="mood selection"
                sx={{ flexWrap: 'wrap' }}
              >
                {MOOD_OPTIONS.map((mood) => (
                  <ToggleButton 
                    key={mood.value} 
                    value={mood.value}
                    aria-label={mood.label}
                    sx={{ 
                      fontSize: '1.5rem',
                      p: 2,
                      m: 0.5,
                      borderRadius: '12px !important'
                    }}
                  >
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <span>{mood.emoji}</span>
                      <Typography variant="caption" sx={{ mt: 1 }}>
                        {mood.label}
                      </Typography>
                    </Box>
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
              {formik.touched.mood && formik.errors.mood && (
                <FormHelperText error>{formik.errors.mood}</FormHelperText>
              )}
            </Grid>

            {/* Activity Level */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Activity Level</InputLabel>
                <Select
                  name="activityLevel"
                  value={formik.values.activityLevel}
                  onChange={formik.handleChange}
                  label="Activity Level"
                >
                  <MenuItem value="sedentary">Sedentary</MenuItem>
                  <MenuItem value="light">Lightly Active</MenuItem>
                  <MenuItem value="moderate">Moderately Active</MenuItem>
                  <MenuItem value="very">Very Active</MenuItem>
                  <MenuItem value="extra">Extra Active</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Sleep Hours */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="sleepHours"
                name="sleepHours"
                label="Average Sleep Hours"
                type="number"
                value={formik.values.sleepHours}
                onChange={formik.handleChange}
                error={formik.touched.sleepHours && Boolean(formik.errors.sleepHours)}
                helperText={formik.touched.sleepHours && formik.errors.sleepHours}
              />
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                disabled={loading}
                sx={{ mt: 2 }}
              >
                {loading ? 'Saving...' : 'Save Profile'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </MotionPaper>
    </Container>
  );
};

export default UserProfilePage;
