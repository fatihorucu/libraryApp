import React from "react";

function Button({ children, className, outlined = false, ...props }) {
  const baseClasses =
    "py-2 px-4 rounded shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-colors duration-200";

  const variantClasses = outlined
    ? "bg-transparent border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
    : "bg-blue-500 text-white hover:bg-blue-600";

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
