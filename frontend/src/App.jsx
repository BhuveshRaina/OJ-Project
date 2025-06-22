import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import AuthPage from "../pages/AuthPage"; 

export default function App() {
  return (
    <Routes>
      <Route element={<AuthPage />}>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Route>
    </Routes>
  );
}
