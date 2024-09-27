import React from "react";
import Input from "./Input";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  const handleForgotPassword = () => {
    // Handle forgot password action
  };

  function handleRegister() {
    navigate("/auth/register");
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
      <div className="flex flex-col space-y-4">
        <h3 className="text-2xl font-bold text-left">Login</h3>

        <Input placeholder="Student Number" className="w-full" />

        <Input placeholder="Password" type="password" className="w-full" />

        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Forgot Password?
          </button>
        </div>

        <div className="flex gap-2">
          <Button outlined className="w-1/2" onClick={handleRegister}>
            Register
          </Button>
          <Button type="submit" className="w-1/2">
            Login
          </Button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
