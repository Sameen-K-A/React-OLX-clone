import React, { useContext, useState } from "react";
import {useNavigate, Link} from "react-router-dom"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import FirebaseContext from "../storage/firebaseContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../../public/Images/olx-logo.png";
import "../../public/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const firebaseApp = useContext(FirebaseContext);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    const authentication = getAuth(firebaseApp);
    try {
      await signInWithEmailAndPassword(authentication, email, password);
      navigate("/");
    } catch (error) {
      toast.error("Enter valid email and password",  {autoClose: false, progressBar: false})
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="loginParentDiv">
        <img width="150px" height="150px" src={Logo} alt="OLX Logo" />
        <form onSubmit={(e) => {handleLogin(e)}}>
          <label htmlFor="fname">Email</label>
          <input className="input" type="email" id="fname" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <label htmlFor="lname">Password</label>
          <input className="input" type="password" id="lname" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <button type="submit">Login</button>
        </form>
        <div className="dontHaveAccount">
          <p><Link to={"/signup"}>You don't have an account. Sign up</Link></p>
        </div>
      </div>
    </>
  );
}

export default Login;