import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Index from './index';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Problem from './components/Problem';
import Dashboard from './pages/dashboard';
import Contest from './pages/contest';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/problems" element={<Problem/>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/contest' element={<Contest/>}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);