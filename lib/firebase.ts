import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCvj2kVNe6PORfhoGtLFobc0Z-BNCZzqxU",
  authDomain: "gstay-5f8cf.firebaseapp.com",
  projectId: "gstay-5f8cf",
  storageBucket: "gstay-5f8cf.appspot.com",
  messagingSenderId: "609330023871",
  appId: "1:609330023871:web:6357e0d0c2e9c00dc9250a",
  measurementId: "G-KR00W3QX7N"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth }; 