import React, { useEffect } from "react";
import { AiOutlineLogin } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import {
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../firebase";
import { useUserContext } from "../context/user_context";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";





const HomePage = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setTimeActive} = useUserContext();

  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);

  const login = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        if (!auth.currentUser.emailVerified) {
          sendEmailVerification(auth.currentUser)
            .then(() => {
              setTimeActive(true);
              navigate("/verify-email");
            })
            .catch((err) => alert(err.message));
        } else {
          naviga1te("/chat");
        }
      })
      .catch((err) => setError(err.message));
  };

  // check if you are logged
  useEffect(() => {
    
    if(user && loading === false)
      window.location.href = '/chat'
    
  }, [user, loading])


  return (
    <main className="flex h-screen justify-center items-center flex-col">
      <div className="w-full h-screen bg-[url('./assets/hero14.jpg')] bg-cover bg-center grayscale-0">
        <div className="w-full h-full flex flex-col justify-center  gap-10 items-center">
          <h1 className="text-3xl text-black ">Log in into your account</h1>
          <span>
            <AiOutlineLogin className="text-black text-5xl" />
          </span>
          <form
            action="submit"
            onSubmit={login}
            name="login_form"
            className="rounded-md p-5 bg-white/40 shadow-lg shadow-black"
          >
            <div className="text-black items-center space-y-5">
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
              {/* remember me */}
              <div className="flex gap-3">
                <label htmlFor="remember">
                  <input
                    type="checkbox"
                    id="remember"
                    aria-describedby="remember"
                  />
                  Remember me
                </label>
                <a href="#">Forgot Password?</a>
              </div>
            </div>
            <button className=" bg-gray-700 rounded-md text-2xl p-3 w-full my-4 text-white hover:text-black hover:bg-white hover:border hover:border-black">
              Sign in
            </button>
            <p className="text-black">
              Don't have an account yet?
              <Link to="/register" className="font-bold">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
