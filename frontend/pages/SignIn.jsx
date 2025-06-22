import React from 'react';
import desktop from '../assets/login_desktop.png'; 
import mobile from '../assets/login_mobile.png'; 
import { Link } from 'react-router-dom'; 
import { useState } from 'react';
import { useEffect } from 'react';
import logo from '../assets/logo.png';
import CodePulse from '../assets/CodePulse.png';
import Header from '../components/Header';
import Footer from '../components/Footer';
export default function LoginPage() {
    const [bgImage, setBgImage] = useState();
    useEffect(() => {
        const isMobile = window.innerWidth < 768; 
        setBgImage(isMobile ? mobile : desktop);
    }, []);
  return (
    <>
    <div
      className="min-h-screen  bg-cover bg-center flex flex-col items-center min-w-full relative "
      style={{ backgroundImage: `url(${bgImage})` }}
    >
    <div className='absolute top-1/2 left-1/2 transform -translate-x-[50%] -translate-y-[50%] flex flex-col items-center space-y-4 sm:min-w-100 sm:w-30%'>
       <div className='h-30 flex flex-row items-center justify-center mb-0'>
       <span className='h-full w-26 ml-[-5px] '>
        <img src={logo}  className='h-full w-full mx-[-10px]'/>
       </span>
        <span>
        <h1 className='text-white text-6xl'>CodePulse</h1>
       </span>
      </div>
      <form className="
          bg-black bg-opacity-40
          rounded-0
          p-8
          max-w-sm w-full
          space-y-6
          opacity-83
          w-full
        "
      >
        <h2 className="text-3xl font-semibold text-center text-white mb-3">
          Welcome Back, Developer
        </h2>
        <p className='text-sm text-white text-center'>No account yet? Initialize one now - <Link
          to="/sign-up"
          className="text-violet-400 hover:text-white text-xl font-medium transition-colors duration-200"
        >
  Sign up
</Link></p>
        {/* Google Auth */}
        <button
          type="button"
          className="
            w-full flex items-center justify-center gap-2
            py-2 bg-white/25 hover:bg-white/35
            rounded-lg font-medium text-white
            transition
          "
        >
          <img
            src="https://img.icons8.com/color/20/000000/google-logo.png"
            alt="Google logo"
            className="w-5 h-5"
          />
          Sign in with Google
        </button>

        {/* separator */}
        <div className="flex items-center text-white/60">
          <div className="flex-1 h-px bg-white/30" />
          <span className="px-2 text-sm">or</span>
          <div className="flex-1 h-px bg-white/30" />
        </div>
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-white mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            className="
              w-full px-4 py-2 rounded-lg
              bg-white/10 placeholder-white/60
              focus:bg-white/20 focus:outline-none text-white
            "
            required
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-white mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            className="
              w-full px-4 py-2 rounded-lg
              bg-white/10 placeholder-white/60
              focus:bg-white/20 focus:outline-none text-white
            "
            required
          />
        </div>

        <button
          type="submit"
          className="
            w-full py-2
            rounded-lg text-white font-medium transition
            bg-violet-500 hover:bg-violet-600
          "
        >
          Sign in
        </button>
      </form>
    </div>
   
    </div>
    </>
    
  );
}
