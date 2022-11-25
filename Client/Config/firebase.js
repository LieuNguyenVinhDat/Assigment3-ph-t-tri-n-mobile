// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDv4Um3y_rOx-4BaSU5CWi1vuGpxScdlL0",
  authDomain: "fir-bcb57.firebaseapp.com",
  projectId: "fir-bcb57",
  storageBucket: "fir-bcb57.appspot.com",
  messagingSenderId: "423134087151",
  appId: "1:423134087151:web:a097dcc7940dd60be4581a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);