import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import Navigation from './components/Navigation';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';
import HomePage from './components/HomePage';
import WorkoutLocationSelection from './components/WorkoutLocationSelection';
import WorkoutSelection from './components/WorkoutSelection';
import WorkoutDetail from './components/WorkoutDetail';
import QuickPump from './components/QuickPump';
import WorkoutHistory from './components/WorkoutHistory';
import ProgressDashboard from './components/ProgressDashboard';
import Achievements from './components/Achievements';
import ExerciseLibrary from './components/ExerciseLibrary';
import Settings from './components/Settings';
import ScrollToTop from './components/ScrollToTop';
import { BookOpenText, Settings as SettingsIcon, Moon, Sun } from 'lucide-react';

const workoutPrograms = {
  arms: {
    id: 'arms',
    name: 'Arms & Upper Body',
    type: 'strength',
    location: 'gym',
    targetMuscles: ['biceps', 'triceps', 'shoulders', 'chest', 'back'],
    duration: '45-60 min',
    difficulty: 'Intermediate',
    calories: '300-400',
    description: 'Complete upper body workout focusing on arms and auxiliary muscle groups',
    exercises: [
      {
        name: 'Overhead Press Machine',
        defaultSets: 4,
        defaultReps: '15',
        defaultWeight: 50,
        notes: [
          'Alternate between outside and inner grip',
          '2 sets with each grip position',
          'Start with 50lbs and adjust based on form'
        ],
        muscles: ['shoulders', 'triceps']
      },
      {
        name: 'Arm Extension Machine',
        defaultSets: 3,
        defaultReps: '15',
        defaultWeight: 50,
        notes: [
          'Keep elbows stable throughout movement',
          'Focus on tricep contraction'
        ],
        muscles: ['triceps']
      },
      {
        name: 'Arm Curl Machine',
        defaultSets: 3,
        defaultReps: '10',
        defaultWeight: 50,
        notes: [
          'Control the negative portion of the movement',
          'Keep back straight against pad'
        ],
        muscles: ['biceps']
      },
      {
        name: 'Chest Press (Large)',
        defaultSets: 4,
        defaultReps: ['15', '15', '15', '10'],
        defaultWeight: [70, 70, 70, 90],
        notes: [
          'Increase weight for final set',
          'Maintain full range of motion'
        ],
        muscles: ['chest', 'triceps', 'shoulders']
      }
    ]
  },
  abs: {
    id: 'abs',
    name: 'Core & Abs',
    type: 'strength',
    location: 'gym',
    exercises: [
      { name: 'Burpees', sets: 3, reps: '30 sec', rest: '30 sec' },
      { name: 'Mountain Climbers', sets: 3, reps: '30 sec', rest: '30 sec' },
      { name: 'Jump Rope', sets: 3, reps: '30 sec', rest: '30 sec' },
    ]
  },
  legs: {
    id: 'legs',
    name: 'Legs & Lower Body',
    type: 'strength',
    location: 'gym',
    exercises: [
      { name: 'Burpees', sets: 3, reps: '30 sec', rest: '30 sec' },
      { name: 'Mountain Climbers', sets: 3, reps: '30 sec', rest: '30 sec' },
      { name: 'Jump Rope', sets: 3, reps: '30 sec', rest: '30 sec' },
    ]
  },
  hiit: {
    id: 'hiit',
    name: 'HIIT Workout',
    type: 'cardio',
    location: 'home',
    exercises: [
      { name: 'Burpees', sets: 3, reps: '30 sec', rest: '30 sec' },
      { name: 'Mountain Climbers', sets: 3, reps: '30 sec', rest: '30 sec' },
      { name: 'Jump Rope', sets: 3, reps: '30 sec', rest: '30 sec' },
    ]
  },
  cardio: {
    id: 'cardio',
    name: 'Cardio Blast',
    type: 'cardio',
    location: 'home',
    exercises: [
      { name: 'Running', sets: 1, reps: '20 min', rest: 'none' },
      { name: 'Jumping Jacks', sets: 3, reps: '50', rest: '1 min' },
      { name: 'High Knees', sets: 3, reps: '1 min', rest: '30 sec' },
    ]
  }
};

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [workouts, setWorkouts] = useState(() => {
    const savedWorkouts = localStorage.getItem('workouts');
    return savedWorkouts ? JSON.parse(savedWorkouts) : [];
  });

  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    localStorage.setItem('workouts', JSON.stringify(workouts));
  }, [workouts]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const login = async (username, password) => {
    if (username && password) {
      const user = { id: 1, username };
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      return true;
    }
    return false;
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const addWorkout = (workout) => {
    const newWorkout = {
      ...workout,
      id: Date.now(),
      date: new Date().toISOString(),
      userId: user.id
    };
    setWorkouts([...workouts, newWorkout]);
  };

  return (
    <Router>
      <ScrollToTop />
      <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${darkMode ? 'dark' : ''}`}>
        {user && (
          <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 dark:from-gray-100 dark:to-blue-300 bg-clip-text text-transparent">
                    ZoneX
                  </h1>
                </div>
                <div className="flex items-center space-x-4">
                  <Link 
                    to="/exercise-library"
                    className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <BookOpenText className="w-5 h-5" />
                  </Link>
                  <Link
                    to="/settings"
                    className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <SettingsIcon className="w-5 h-5" />
                  </Link>
                  <button
                    onClick={toggleDarkMode}
                    className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                  >
                    {darkMode ? (
                      <Sun className="w-5 h-5" />
                    ) : (
                      <Moon className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </header>
        )}

        <main className="max-w-7xl mx-auto pb-20">
          <Routes>
            <Route path="/login" element={<Login onLogin={login} />} />
            <Route
              path="/"
              element={
                <PrivateRoute user={user}>
                  <HomePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/select-location"
              element={
                <PrivateRoute user={user}>
                  <WorkoutLocationSelection />
                </PrivateRoute>
              }
            />
            <Route
              path="/workouts/:location"
              element={
                <PrivateRoute user={user}>
                  <WorkoutSelection workouts={Object.values(workoutPrograms)} />
                </PrivateRoute>
              }
            />
            <Route
              path="/workout/:id"
              element={
                <PrivateRoute user={user}>
                  <WorkoutDetail
                    workoutPrograms={workoutPrograms}
                    onFinish={addWorkout}
                  />
                </PrivateRoute>
              }
            />
            <Route
              path="/quick-pump"
              element={
                <PrivateRoute user={user}>
                  <QuickPump />
                </PrivateRoute>
              }
            />
            <Route
              path="/history"
              element={
                <PrivateRoute user={user}>
                  <WorkoutHistory workouts={workouts} />
                </PrivateRoute>
              }
            />
            <Route
              path="/progress"
              element={
                <PrivateRoute user={user}>
                  <ProgressDashboard workouts={workouts} />
                </PrivateRoute>
              }
            />
            <Route
              path="/achievements"
              element={
                <PrivateRoute user={user}>
                  <Achievements workouts={workouts} />
                </PrivateRoute>
              }
            />
            <Route
              path="/exercise-library"
              element={
                <PrivateRoute user={user}>
                  <ExerciseLibrary />
                </PrivateRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <PrivateRoute user={user}>
                  <Settings darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        {user && <Navigation />}
      </div>
    </Router>
  );
}

export default App;
