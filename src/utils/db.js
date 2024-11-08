export function openDatabase() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('workout-tracker', 1);
  
      request.onerror = () => {
        reject(new Error('Failed to open database'));
      };
  
      request.onsuccess = () => {
        resolve(request.result);
      };
  
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        db.createObjectStore('workouts', { keyPath: 'id', autoIncrement: true });
      };
    });
  }
  
  export function saveWorkout(workout) {
    return openDatabase().then((db) => {
      const transaction = db.transaction(['workouts'], 'readwrite');
      const store = transaction.objectStore('workouts');
      store.add(workout);
      return transaction.complete;
    });
  }
  
  export function getWorkouts() {
    return openDatabase().then((db) => {
      const transaction = db.transaction(['workouts'], 'readonly');
      const store = transaction.objectStore('workouts');
      return store.getAll();
    });
  }
  
  export function clearWorkouts() {
    return openDatabase().then((db) => {
      const transaction = db.transaction(['workouts'], 'readwrite');
      const store = transaction.objectStore('workouts');
      store.clear();
      return transaction.complete;
    });
  }