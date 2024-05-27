import React, { useContext, useState } from "react";
import Logo from "../../public/Images/olx-logo.png";
import FirebaseContext from "../storage/firebaseContext";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../public/Signup.css";

const Signup = () => {
  const firebaseApp = useContext(FirebaseContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const authentication = getAuth(firebaseApp);
    try {
      const userCredential = await createUserWithEmailAndPassword(authentication,email,password);
      const user = userCredential.user;
      const database = getFirestore(firebaseApp);
      const userObj = {
        uid: user.uid,
        name: name,
        phone: phone,
        email: email,
      };
      await setDoc(doc(database, "users", user.uid), userObj);
      toast.success("User registered successfully", {closeButton: false, autoClose: 2000, hideProgressBar: true});
      setTimeout(() => {
        navigate("/login");
      }, 2500);
    } catch (error) {
      if (error.code === "auth/weak-password") {
        toast.error("Password should be at least 6 characters", {closeButton: true, autoClose: false, progressBar: false});
      } else if (error.code === "auth/email-already-in-use") {
        toast.error("Email already exists", {closeButton: true, autoClose: false, progressBar: false});
      } else {
        toast.error("Something wrong, Please try again later", {closeButton: true, autoClose: false, progressBar: false});
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="signupParentDiv">
        <img width="150px" height="150px" src={Logo} alt="OLX Logo" />
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input className="input" type="text" id="username" name="name" value={name} onChange={(e) => setName(e.target.value)}/>
          <label htmlFor="email">Email</label>
          <input className="input" type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <label htmlFor="phone">Phone</label>
          <input className="input" type="number" id="phone" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)}/>
          <label htmlFor="password">Password</label>
          <input className="input" type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <button type="submit">Signup</button>
        </form>
        <div className="alreadyAccount">
          <p><Link to={"/login"}>Already have an account Login</Link></p>
        </div>
      </div>
    </>
  );
};

export default Signup;