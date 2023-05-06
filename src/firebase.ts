import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBfd44ZZbco5uv9GcdUAvMC4xtD--135_o',
  authDomain: 'restaurant-app-cf7de.firebaseapp.com',
  projectId: 'restaurant-app-cf7de',
  storageBucket: 'restaurant-app-cf7de.appspot.com',
  messagingSenderId: '451816006963',
  appId: '1:451816006963:web:604b821e52b28e8d368a46',
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
