import { useState, useEffect } from 'react'
import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import Register from './pages/Register'
import Chat from './pages/Chat'
import VerifyEmail from './pages/VerifyEmail'
import PrivateRoute from './PrivateRoute'


function App() {

  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          exact
          path="/chat"
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App
