import React from 'react';
import { Link, useLocation } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import logo from '../assets/logo.png';

export default function Header() {
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const location = useLocation();

//   if (isAuthenticated) {
//     return (
//       <header className="w-full flex justify-between items-center p-4 px-10 bg-[#1E2749] bg-opacity-80 backdrop-blur-md border-b">
//         <div className="flex items-center space-x-3">
//           <img src={logo} alt="CodePulse" className="h-8 scale-180" />
//           <span className="text-white text-2xl font-semibold">CodePulse</span>
//         </div>
//         <nav className="flex space-x-10 text-gray-300 items-center px-5 font-bold text-lg">
//           <Link to="/" className="hover:text-cyan-400 transition">Home</Link>
//           <Link to="/problems" className="hover:text-cyan-400 transition">Problems</Link>
//           <Link to="/contests" className="hover:text-cyan-400 transition">Contests</Link>
//           <div className="w-9 h-9 rounded-full bg-cyan-500 flex items-center justify-center text-white font-bold">
//             A
//           </div>
//         </nav>
//       </header>
//     );
//   }

  let authButton = { text: 'Sign In', link: '/sign-in' };
  if (location.pathname === '/sign-up') {
    authButton = { text: 'Sign In', link: '/sign-in' };
  } else if (location.pathname === '/sign-in') {
    authButton = { text: 'Sign Up', link: '/sign-up' };
  }

  return (
    <header className="w-full flex justify-between items-center p-4 px-10 bg-[#1E2749] bg-opacity-80 backdrop-blur-md border-b">
      <div className="flex items-center space-x-3">
        <img src={logo} alt="CodePulse" className="h-8 scale-180" />
        <span className="text-white text-2xl font-semibold">CodePulse</span>
      </div>
      <nav className="flex space-x-10 text-gray-300 items-center px-5 font-semibold text-lg">
        <Link to="/" className="hover:text-violet-400 transition">Home</Link>
        <Link to="/problems" className="hover:text-violet-400 transition">Problems</Link>
        <Link to="/contests" className="hover:text-violet-400 transition">Contests</Link>
        <Link
          to={authButton.link}
          className="bg-violet-500 hover:bg-cyan-600 text-white px-5 py-1 rounded-lg font-medium"
        >
          {authButton.text}
        </Link>
      </nav>
    </header>
  );
}
