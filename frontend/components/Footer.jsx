import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full flex flex-col items-center justify-center p-4 bg-[#1E2749] bg-opacity-80 border-t border-black text-white text-sm space-y-2">
      <div>© {new Date().getFullYear()} CodePulse. All Rights Reserved.</div>
      {/* <div className="flex space-x-4">
        <a href="/privacy" className="hover:text-cyan-400">Privacy Policy</a>
        <a href="/terms" className="hover:text-cyan-400">Terms of Service</a>
        <a href="/contact" className="hover:text-cyan-400">Contact</a>
      </div> */}
      <div className="text-white">Built with for developers and learners</div>
    </footer>
  );
}
