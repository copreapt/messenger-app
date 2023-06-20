import React from "react";
import { useUserContext } from "../context/user_context";
import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { sendEmailVerification } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function VerifyEmail() {
  const [user] = useAuthState(auth);

  const { timeActive, setTimeActive } = useUserContext();
  const [time, setTime] = useState(60);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      user
        ?.reload()
        .then(() => {
          if (user?.emailVerified) {
            clearInterval(interval);
            navigate("/chat");
          }
        })
        .catch((err) => {
          alert(err.message);
        });
    }, 1000);
  }, [navigate, user]);

  useEffect(() => {
    let interval = null;
    if (timeActive && time !== 0) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    } else if (time === 0) {
      setTimeActive(false);
      setTime(60);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timeActive, time]);

  const resendEmailVerification = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        setTimeActive(true);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="text-center w-screen h-screen bg-gray-300">
      <div className="space-y-5 text-xl py-20">
        <h1>Verify your Email Address</h1>
        <p>
          <strong>A Verification email has been sent to:</strong>
          <span className="m-2">{user?.email}</span>
        </p>
        <span>Follow the instruction in the email to verify your account</span>{" "}
        <br />
        <button
          className="m-2 font-bold rounded-md p-3 bg-gray-400 text-black hover:text-white hover:bg-gray-700"
          onClick={resendEmailVerification}
          disabled={timeActive}
        >
          Resend Email {timeActive && time}
        </button>
        <ToastContainer />
      </div>
    </div>
  );
}

export default VerifyEmail;
