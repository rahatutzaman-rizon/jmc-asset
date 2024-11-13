"use client";

import React from 'react';


const Button = ({ onClick, children, className }) => {
  return (
    <button
      onClick={onClick}
      className={`px-8 py-2 rounded-md text-sm sm:text-base font-medium text-slate-800 hover:bg-cyan-950 hover:text-cyan-50 transition ease-in-out duration-300 ${className}`}
    >
      {children}
    </button>
  );
};



export default Button;
