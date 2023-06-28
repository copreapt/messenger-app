import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { useUserContext } from '../context/user_context'
import { setDoc,doc } from "firebase/firestore";
import {  toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const Register = () => {

  const {setTimeActive} = useUserContext();

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [terms, setTerms] = useState(false)
  const [termsError, setTermsError] = useState(false)
  
  const [error, setError] = useState('')
  const navigate = useNavigate();

  const showRegisterSuccess = () => {
    toast.success("Your account has been created! Please verify your email!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const showRegisterFail = () => {
    toast.error("Your account has been created! Please verify your email!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

const validatePassword = () => {
    let isValid = true;
    if (password !== "" && confirmPassword !== "") {
      if (password !== confirmPassword) {
        isValid = false;
        setError("Passwords does not match");
      }
    }
    return isValid;
  };

const register =  (e) => {
  e.preventDefault();
  setError("");
  if (validatePassword() && terms) {
    // Create a new user with email and password using firebase
    createUserWithEmailAndPassword(auth, email, password)
      .then(event => {
        // stock data into users collection
     setDoc(doc(db, "users", event.user.uid), {
      img_url:
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      name: name,
      uid: event.user.uid,
    });
    setDoc(doc(db, "userChats", event.user.uid), {
      
    });
      updateProfile(auth.currentUser, {
        displayName: name,
        photoURL:
          "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      });
        // send verification email
        sendEmailVerification(auth.currentUser)
          .then(() => {
            setTimeActive(true)
            navigate("/verify-email");
          })
          .catch((err) => alert(err.message));
        // show event return

        // create user profile using firestore

        // user was succesifully created
        showRegisterSuccess()
      })
      .catch((err) => setError(err.message));
       setName("");
       setEmail("");
       setPassword("");
       setConfirmPassword("");
  } else {
    setTermsError(true);
  }
};
  
const handleChange = () => {
  setTerms(!terms)
}

 useEffect(() => {
   const timer = setTimeout(() => {
     setTermsError(false);
   }, 3000);
   return () => clearTimeout(timer);
 }, [termsError]);

  return (
    <main className="flex h-screen justify-center items-center flex-col">
      <div className="w-full h-screen bg-[url('./assets/hero14.jpg')] bg-cover bg-center grayscale-0">
        <div className="w-full h-full flex flex-col justify-center backdrop-brightness-100 gap-10 items-center">
          {error && <div>{error}</div>}
          <h1 className="text-3xl text-black">Register your new account</h1>
          <form
            onSubmit={register}
            name="registration_form"
            className="rounded-md p-5 bg-white/40 shadow-lg shadow-black"
          >
            <div className="text-black items-center space-y-5">
              {/* name */}
              <div className="flex flex-col gap-4">
                <label htmlFor="email" className="text-xl">
                  Your name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="rounded-md bg-gray-600 p-2 text-white"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              {/* email */}
              <div className="flex flex-col gap-4">
                <label htmlFor="email" className="text-xl">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="rounded-md bg-gray-600 p-2 text-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {/* password */}
              <div className="flex flex-col gap-4">
                <label htmlFor="password" className="text-xl">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="********"
                  className="rounded-md bg-gray-600 p-2 text-white"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {/* repeat password */}
              <div className="flex flex-col gap-4">
                <label htmlFor="password" className="text-xl">
                  Repeat password
                </label>
                <input
                  type="password"
                  name="repeat-password"
                  id="repeat-password"
                  placeholder="********"
                  className="rounded-md bg-gray-600 p-2 text-white"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              {/* remember me */}
              <div className="flex gap-3">
                <label htmlFor="remember">
                  <input
                    type="checkbox"
                    id="remember"
                    aria-describedby="remember"
                    onChange={handleChange}
                  />
                  <span
                    className={`${termsError ? "text-red-500 ml-1" : "ml-1"}`}
                  >
                    I agree with{" "}
                  </span>
                  <span
                    className={`${
                      termsError
                        ? "text-red-500 font-semibold"
                        : "font-semibold"
                    }`}
                  >
                    <Link to="/terms" target='_blank'>terms and conditions</Link>
                  </span>
                </label>
              </div>
            </div>
            <button className="bg-gray-700 rounded-md text-xl p-3 w-full my-4 text-black hover:text-black hover:bg-white">
              Register new account
            </button>
            <p className="text-black">
              Do you have an account?
              <Link to="/" className="font-bold">
                Sign in
              </Link>
            </p>
          </form>
          <ToastContainer />
        </div>
      </div>
    </main>
  );
}

export default Register;
