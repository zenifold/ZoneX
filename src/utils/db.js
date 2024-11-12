export function saveWorkout(workout) {
  return new Promise((resolve) => {
    // Get existing workouts
    const existingWorkouts = JSON.parse(localStorage.getItem('workouts') || '[]');
    
    // Add new workout
    existingWorkouts.push(workout);
    
    // Save back to localStorage
    localStorage.setItem('workouts', JSON.stringify(existingWorkouts));
    
    resolve();
  });
}

export function getWorkouts() {
  return new Promise((resolve) => {
    const workouts = JSON.parse(localStorage.getItem('workouts') || '[]');
    resolve(workouts);
  });
}

export function clearWorkouts() {
  return new Promise((resolve) => {
    localStorage.removeItem('workouts');
    resolve();
  });
}
