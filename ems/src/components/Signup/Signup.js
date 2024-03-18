import React, { useState } from "react";
import styles from "./Signup.module.css";
import InputControl from "../inputControl/inputControl";
import { Link, useHistory } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";

export default function Signup() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    pass: "",
  });

  // Error message
  const navigate = useHistory();
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

//------------------Sign  up error message handling----------------------


//---------------Handel Submission Function------------------------------
  const handleSubmission = async () => {
    if (!values.name || !values.email || !values.pass) {
      setErrorMsg("Fill all fields");
      return;
    }

    setSubmitButtonDisabled(true);

    // If all fields are valid, then empty the error message
    setErrorMsg("");

    try {
      const res = await createUserWithEmailAndPassword(auth, values.email, values.pass);
      const user = res.user;

      await updateProfile(user, {
        displayName: values.name,
      });

      setSubmitButtonDisabled(false);
      navigate.push("/"); //redirect to original page
    } catch (err) {
      setSubmitButtonDisabled(false);
      setErrorMsg(err.message);
      console.error("Error-", err.message);
    }
  };
//-----------------All Functions Ends Here----------------------------------

//-----------------React JSX HTML Start--------------------------------------------
  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
      {/* -------------------Signup Heading------------------------ */}
        <h1 className={styles.heading}>Signup</h1>
        <InputControl
          label="Name"
          placeholder="Enter Your Name"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, name: event.target.value }))
          }
        />
{/* ---------------------Passing the data to inputControl using props-----------------------------------  */}
        <InputControl
          label="Email"
          placeholder="Enter Your Email Address"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }
        />

        <InputControl
          label="Password"
          placeholder="Enter Your Password"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, pass: event.target.value }))
          }
        />
{/* --------------Signup Button Handeling------------------------- */}
        <div className={styles.footer}>
          <b className={styles.error}>{errorMsg}</b>
          <button onClick={handleSubmission} disabled={submitButtonDisabled}>
            Signup
          </button>
          <p>
            Already have an account?{" "}
            <span>
              <Link to="/login">Login</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
