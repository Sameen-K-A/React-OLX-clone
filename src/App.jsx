import React, { useContext, useEffect } from "react";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Create from "./Pages/Create";
import ViewPost from "./Pages/ViewPost";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "../public/app.css";
import { userContext } from "./storage/userContext";
import FirebaseContext from "./storage/firebaseContext";
import { ViewContextProvider } from "./storage/viewContext.jsx";
import { getAuth } from "firebase/auth";

function App() {
  const { setUser } = useContext(userContext);
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const authentication = getAuth(firebase);
    authentication.onAuthStateChanged((user) => setUser(user));
  }, []);

  return (
    <>
      <ViewContextProvider>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/create" element={<Create />} />
            <Route exact path="/view-post" element={<ViewPost />} />
          </Routes>
        </Router>
      </ViewContextProvider>
    </>
  );
}

export default App;