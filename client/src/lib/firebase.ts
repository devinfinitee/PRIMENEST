import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY?.trim(),
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN?.trim(),
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID?.trim(),
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET?.trim(),
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID?.trim(),
  appId: import.meta.env.VITE_FIREBASE_APP_ID?.trim(),
};

// Validate Firebase configuration
const isConfigValid = Object.values(firebaseConfig).every(value => value && value !== 'undefined');

if (!isConfigValid) {
  console.warn('⚠️ Firebase configuration is incomplete. Please check your .env file.');
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Suppress Firestore warnings in development
if (import.meta.env.DEV) {
  // This helps reduce console noise during development
  const originalWarn = console.warn;
  const originalError = console.error;
  
  console.warn = (...args) => {
    const message = args[0]?.toString() || '';
    // Filter out specific Firebase warnings that are not critical
    if (
      message.includes('WebChannel') ||
      message.includes('RPC') ||
      message.includes('stream') ||
      message.includes('transport errored') ||
      message.includes('Firestore') ||
      message.includes('@firebase') ||
      message.includes('Listen') ||
      message.includes('undefined Message')
    ) {
      return; // Suppress these warnings
    }
    originalWarn.apply(console, args);
  };
  
  console.error = (...args) => {
    const message = args[0]?.toString() || '';
    // Filter out Firebase connection errors that don't affect functionality
    if (
      message.includes('Failed to load') ||
      message.includes('the server') ||
      message.includes('net::ERR_ABORTED 400') ||
      message.includes('googleapis.com')
    ) {
      return; // Suppress these errors
    }
    originalError.apply(console, args);
  };
}

export default app;
