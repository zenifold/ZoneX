import React from 'react';

function AuthBackground({ children }) {
  return (
    <div className="fixed inset-0 overflow-hidden bg-gray-50">
      {/* Abstract Gradient Background */}
      <div className="absolute inset-0">
        {/* Blurred Circles */}
        <div className="absolute -top-1/4 -left-1/4 w-[800px] h-[800px] bg-blue-300 rounded-full mix-blend-multiply filter blur-[80px] opacity-80 animate-blob"></div>
        <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-violet-300 rounded-full mix-blend-multiply filter blur-[80px] opacity-80 animate-blob"></div>
        <div className="absolute -bottom-1/4 left-1/4 w-[800px] h-[800px] bg-pink-300 rounded-full mix-blend-multiply filter blur-[80px] opacity-80 animate-blob"></div>
        <div className="absolute -bottom-1/4 right-1/4 w-[800px] h-[800px] bg-yellow-300 rounded-full mix-blend-multiply filter blur-[80px] opacity-80 animate-blob"></div>
      </div>

      <div className="flex justify-center items-center h-full relative z-10">
        {children}
      </div>
    </div>
  );
}

export default AuthBackground;
