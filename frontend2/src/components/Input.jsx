import React from "react";

function Input({ label, placeholder, className, error, ...props }) {
  const inputClasses = `
    w-full bg-white border rounded-md py-2 px-4 text-gray-700 
    focus:outline-none focus:ring-1
    ${
      error
        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
        : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
    }
    ${className}
  `;

  return (
    <div className="relative">
      <input
        type="text"
        placeholder={placeholder}
        className={inputClasses}
        {...props}
      />
      <label className="absolute top-0 left-4 -mt-3 px-1 text-xs bg-white text-gray-600">
        {label}
      </label>
      {error && (
        <p className="mt-1 text-sm text-red-500 items-start text-left">
          {error}
        </p>
      )}
    </div>
  );
}

export default Input;
