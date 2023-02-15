import React, { useState } from "react";
import { useStateValue } from "../Stateprovider";
import styles from "./Login.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPass, setUserPass] = useState("");
  const [signUP, setSignUp] = useState(false);
  const [{ loggedIn }, dispatch] = useStateValue();
  const navigate = useNavigate();

  const handleAuth = async () => {
    const params = { username: userEmail, password: userPass };
    if (!signUP) {
      console.log("Loggin in");
      await axios.get("http://localhost:3001/auth", { params }).then((res) => {
        console.log(res.data);
        if (res.data.message !== "success") {
          alert(res.data.message);
        } else {
          console.log(res.data);
          dispatch({
            type: "UPDATE_USER",
            user: res.data,
          });
          dispatch({
            type: "UPDATE_LOGGED_IN",
            status: true,
          });
        }
      });
    } else {
      console.log("signing up");
      await axios.post("http://localhost:3001/auth", { params }).then((res) => {
        console.log(res.data);
        dispatch({
          type: "UPDATE_USER",
          user: res.data,
        });
        dispatch({
          type: "UPDATE_LOGGED_IN",
          status: true,
        });
      });
    }
  };

  return (
    <div className={styles.container}>
      <span className={styles.login}> Hi There, Login or Sign Up</span>
      <div className={styles.inputDiv}>
        <span className={styles.inputHeading}> Email</span>
        <input
          type="text"
          placeholder="................."
          onChange={(e) => {
            setUserEmail(e.target.value);
          }}
        ></input>
      </div>
      <div className={styles.inputDiv}>
        <span className={styles.inputHeading}> Password </span>
        <input
          type="text"
          placeholder="********"
          onChange={(e) => {
            setUserPass(e.target.value);
          }}
        ></input>
      </div>
      <button className={styles.btn} onClick={handleAuth} type="submit">
        {signUP ? "Sign Up" : "Sign In"}
      </button>
      {!signUP && (
        <span className={styles.inputHeading}>
          New Here ?{" "}
          <span
            className={styles.redirect}
            onClick={() => {
              setSignUp(!signUP);
            }}
          >
            Sign Up
          </span>
        </span>
      )}
      {signUP && (
        <span className={styles.inputHeading}>
          Log in ?{" "}
          <span
            className={styles.redirect}
            onClick={() => {
              setSignUp(!signUP);
            }}
          >
            Sign In
          </span>
        </span>
      )}
    </div>
  );
};

export default Login;
