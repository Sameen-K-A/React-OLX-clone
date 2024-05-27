import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC-IX21gl0phEGlEPZzwTnKHgGLvd63_Ws",
  authDomain: "react-olx-6a06f.firebaseapp.com",
  projectId: "react-olx-6a06f",
  storageBucket: "react-olx-6a06f.appspot.com",
  messagingSenderId: "881494502011",
  appId: "1:881494502011:web:f6db2fe12fafe2218d90de",
  measurementId: "G-B9PNZFXXF9",
};

const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;