import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Title from "../components/Title";
import { auth } from "../config/firebase";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const registerUser = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result.email);
        alert("Congragulations! User has been successfully sign-up");
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
      });
  };

  const signInUser = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result.email);
        alert("Congragulations! User has successfully Logged-in");
        history.push("/home");
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
      });
  };

  return (
    <div className="login">
      <Title title="Sign In" span="Sign In" />
      <div className="login__Container">
        <form>
          <h3>Email</h3>
          <input
            type="text"
            placeholder="Enter E-mail here"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h3>Password</h3>
          <input
            type="password"
            placeholder="Enter Password here"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="login__login" onClick={signInUser}>
            Login
          </button>
          <h3>Don't have Account? sign up here</h3>
          <button className="login__signUp" onClick={registerUser}>
            Sign-up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
