import React from "react";
import Input from "./Input";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleBack = () => {
    navigate("/auth");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
      <div className="flex flex-col space-y-4">
        <h3 className="text-2xl font-bold text-left">Register</h3>
        <div className="flex flex-wrap -mx-2">
          <div className="w-full md:w-1/2 px-2 mb-4">
            <Input placeholder="Name" className="w-full" />
          </div>
          <div className="w-full md:w-1/2 px-2 mb-4">
            <Input placeholder="Surname" className="w-full" />
          </div>
        </div>

        <Input placeholder="Birthday" type="date" className="w-full" />

        <Input placeholder="Student Number" className="w-full" />

        <Input placeholder="Phone Number" className="w-full" />

        <Input placeholder="Password" type="password" className="w-full" />

        <Input
          placeholder="Confirm Password"
          type="password"
          className="w-full"
        />

        <div className="flex gap-2">
          <Button outlined className={"w-1/2"} onClick={handleBack}>
            Back
          </Button>
          <Button className={"w-1/2"}>Register</Button>
        </div>
      </div>
    </form>
  );
};

export default RegistrationForm;
