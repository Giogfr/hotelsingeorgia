import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBysgaPcYDnmSLf3pqo25C9LRsmt19NbS0",
  authDomain: "georgiastay-4cd33.firebaseapp.com",
  projectId: "georgiastay-4cd33",
  storageBucket: "georgiastay-4cd33.appspot.com",
  messagingSenderId: "632730977795",
  appId: "1:632730977795:web:097d61acc2b303bead7036",
  measurementId: "G-W6P2MSDLL4"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth }; 