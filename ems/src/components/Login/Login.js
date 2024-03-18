import React, {  useState } from "react";
import styles from "./Login.module.css";
import InputControl from "../inputControl/inputControl";
import { Link, useHistory} from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import {
  auth,
  provider,
  GithubAuthProvider,
  FacebookAuthProvider,
  
} from "../firebase";



// import axios from "axios";

const Login = ({ user }) => {
  const [values, setValues] = useState({
    email: "",
    pass: "",
  });
  const navigate=useHistory();
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
 
 

 

  // -------------------All Function starts here---------------------------------


  //--------------------Function to handel phone otp-------------------------------------
  const phoneLogin = async () => {
    navigate.push('/error')
    navigate('/error')
  };
  //*****************End of this function ***********************************************/


  //--------------------Function to handle Facebook login-----------------------------
  const fbClick = async () => {
    try {
      // Sign in with Facebook using Firebase's signInWithPopup method
      const data = await signInWithPopup(auth, new FacebookAuthProvider());

      // Store the user's email in local storage.
      localStorage.setItem("email", data.user.email);

      // Assuming 'displayName' is the property that contains the user's name
      const userName = data.user.displayName;

      // Display an alert with the welcome message
      alert(`Login Successful!! Welcome, ${userName}`);

      // Redirect to the home page
      navigate.push("/");
    } catch (error) {
      console.error("Error signing in with Facebook:", error);
      setErrorMsg("Error signing in with Facebook");
    }
  };
  //*****************End of this function ***********************************************/


  //-----------------------Function to handle Instagram  login--------------------------
  const InstagramLogin = () => {
    navigate.push("/error");
  };

  //*****************End of this function ***********************************************/



  //-----------------------Function to handle Google login-------------------------------------
  const googleClick = () => {
    // Sign in with Google using Firebase's signInWithPopup method.
    signInWithPopup(auth, provider)
      .then((data) => {
        // Store the user's email in local storage.
        localStorage.setItem("email", data.user.email);

        // Check if the user has a display name
        const userName = data.user.displayName || data.user.email;

        // Display an alert with the welcome message or error message
        if (userName) {
          alert(`Login Successful!! Welcome, ${userName}`);
          navigate.push("/");
        } else {
          alert("Error: Display name not found");
          setErrorMsg("Error: Display name not found");
        }
      })
      .catch((error) => {
        // Log an error message if there's an issue with Google sign-in.
        console.error("Error signing in with Google:", error);
        setErrorMsg("Error signing in with Google");
      });
  };

  //*****************End of this function ***********************************************/



  //----------------------- Function to handle GitHub login----------------------------------------
  const gitClick = () => {
    // Create a GitHubAuthProvider instance
    const githubProvider = new GithubAuthProvider();

    // Sign in with GitHub using Firebase's signInWithPopup method
    signInWithPopup(auth, githubProvider)
      .then((data) => {
        // On successful sign-in, set 'email' in localStorage
        localStorage.setItem("email", data.user.email);
        // Assuming 'displayName' is the property that contains the user's name
        const userName = data.user.displayName;

        // Display an alert with the welcome message
        alert(`Login Successful!! Welcome, ${userName}`);
        navigate.push("/");
      })
      .catch((error) => {
        // Log an error message if there's an issue with GitHub sign-in
        console.error("Error signing in with GitHub:", error);
        setErrorMsg("Error signing in with GitHub");
      });
  };
  //*****************End of this function ***********************************************/




  //------------------------ Form  On submit------------------------------------------------
  const handleSubmission = async (event) => {
    event.preventDefault();

    if (!values.email || !values.pass) {
      setErrorMsg("Fill all fields");
      return;
    }

    setSubmitButtonDisabled(true);
    setErrorMsg("");

    try {
      await signInWithEmailAndPassword(auth, values.email, values.pass);
      setSubmitButtonDisabled(false);
      // Redirect to the home page immediately after successful login
      navigate.push("/");
      // await verifyToken();
    } catch (err) {
      setSubmitButtonDisabled(false);
      setErrorMsg(err.message);
      console.error("Error-", err.message);
    }
  };
   // Function to validate JWT token
//    const verifyToken = async () => {
//     try {
//         const token = localStorage.getItem("token");
//         const response = await axios.post('/verify-token', { token });
//         if (response.data.valid) {
//             console.log('Token is valid');
//             // Proceed with authenticated actions
//         } else {
//             console.log('Token is invalid');
//             // Handle invalid token scenario
//         }
//     } catch (error) {
//         console.error('Error validating token:', error);
//         // Handle token validation errors
//     }
// };
  //************************End of this function ***********************************************/
  return (
    //-------Login Heading----------
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h1 className={styles.heading}> Login </h1>



        {/* --------------------------FORM-------------------------------  */}


        {/* --------------------------Email-------------------------------  */}
        <form onSubmit={handleSubmission}>
          <InputControl
            label="Email"
            placeholder="Enter Your Email Address"
            onChange={(event) =>
              setValues((prev) => ({ ...prev, email: event.target.value }))
            }
          />

          {/* --------------------------Password-------------------------------  */}
          <InputControl
            label="Password"
            placeholder="Enter Your Password"
            type="password"
            onChange={(event) =>
              setValues((prev) => ({ ...prev, pass: event.target.value }))
            }
          />

          {/* --------------------------Submit functionality-------------------------------  */}
          <div className={styles.footer}>
            <b className={styles.error}>{errorMsg}</b>
            <button type="submit" disabled={submitButtonDisabled}>
              Login
            </button>
            <p>
              Don't have an account?{" "}
              <span>
                <Link to="/signup">Sign up</Link>
              </span>
            </p>
            <p>
              Or Login with
              <div>


                {/* --------------------------Google Login using Firebase-------------------------------  */}
                <span className="google" onClick={googleClick}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-google"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z" />
                  </svg>
                </span>


                {/* --------------------------Github Login using firebase-------------------------------  */}
                <span
                  className="git"
                  style={{ marginLeft: "10px" }}
                  onClick={gitClick}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-github"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                  </svg>
                </span>


                {/* --------------------------Facebook Login user firebase-------------------------------  */}
                <span
                  className="facebook"
                  style={{ marginLeft: "10px" }}
                  onClick={fbClick}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-facebook"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
                  </svg>
                </span>



                {/* --------------------------Phone Login using Firebase-------------------------------  */}
                <span
                  className="phone"
                  style={{ marginLeft: "10px" }}
                  onClick={phoneLogin}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-telephone"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
                  </svg>
                </span>



                {/* ----------------------Instagram Login useing firebase-------------------------------  */}
                <span
                  className="instagram"
                  style={{ marginLeft: "10px" }}
                  onClick={InstagramLogin}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-instagram"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                  </svg>
                </span>
              </div>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
