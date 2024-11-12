import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import Navigation from './components/Navigation';
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
import workoutPrograms from './workoutPrograms';

function AppContent() {
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

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const addWorkout = (workout) => {
    const newWorkout = {
      ...workout,
      id: Date.now(),
      date: new Date().toISOString()
    };
    setWorkouts([...workouts, newWorkout]);
  };

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${darkMode ? 'dark' : ''}`}>
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <Link to="/" className="cursor-pointer">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 dark:from-gray-100 dark:to-blue-300 bg-clip-text text-transparent">
                  ZoneX
                </h1>
              </Link>
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

      <main className="max-w-7xl mx-auto pb-20">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/select-location" element={<WorkoutLocationSelection />} />
          <Route
            path="/workouts/:location"
            element={<WorkoutSelection workouts={Object.values(workoutPrograms)} />}
          />
          <Route
            path="/workout/:id"
            element={
              <WorkoutDetail
                workoutPrograms={workoutPrograms}
                onFinish={addWorkout}
              />
            }
          />
          <Route path="/quick-pump" element={<QuickPump />} />
          <Route
            path="/history"
            element={<WorkoutHistory workouts={workouts} />}
          />
          <Route
            path="/progress"
            element={<ProgressDashboard workouts={workouts} />}
          />
          <Route
            path="/achievements"
            element={<Achievements workouts={workouts} />}
          />
          <Route path="/exercise-library" element={<ExerciseLibrary />} />
          <Route
            path="/settings"
            element={<Settings darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      <Navigation />
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

export default App;
