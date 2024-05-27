import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import FirebaseContext from "./storage/firebaseContext.js";
import { UserContextProvider } from "./storage/userContext.jsx";
import firebaseApp from "./firebase/firebase.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <FirebaseContext.Provider value={firebaseApp}>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </FirebaseContext.Provider>
);