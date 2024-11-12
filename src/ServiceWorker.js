/* eslint-disable no-restricted-globals */
import { getWorkouts, clearWorkouts } from './utils/db';

export function register() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then((registration) => {
          console.log('Service Worker registered: ', registration);
        })
        .catch((error) => {
          console.log('Service Worker registration failed: ', error);
        });
    });
  }
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('workout-tracker-cache').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/manifest.json',
        '/static/js/bundle.js',
        '/static/css/main.css',
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-workouts') {
    event.waitUntil(syncWorkouts());
  }
});

function syncWorkouts() {
  return getWorkouts().then((workouts) => {
    return fetch('/api/workouts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(workouts),
    }).then(() => {
      return clearWorkouts();
    });
  });
}