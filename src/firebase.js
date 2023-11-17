import {getStorage} from 'firebase/storage'
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCszwPRElzOK05Mw1GJ0Y2ZtC7ZGjP0qhw",
  authDomain: "easyfileshare-d0c8b.firebaseapp.com",
  projectId: "easyfileshare-d0c8b",
  storageBucket: "easyfileshare-d0c8b.appspot.com",
  messagingSenderId: "365619401197",
  appId: "1:365619401197:web:c07ea12c187180255897e4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app);