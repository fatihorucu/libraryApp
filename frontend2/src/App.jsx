import { useState } from "react";
import "./App.css";
import Button from "./components/Button";
import Input from "./components/Input";
import WelcomePageLayout from "./pages/WelcomePageLayout";
import RegistrationForm from "./components/RegistrationForm";
import LoginForm from "./components/LoginForm";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import WelcomeButtons from "./components/WelcomeButtons";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      children: [
        { index: true, element: <WelcomeButtons /> },
        {
          path: "auth",
          element: <WelcomePageLayout />,
          children: [
            { index: true, element: <WelcomeButtons /> },
            { path: "login", element: <LoginForm /> },
            { path: "register", element: <RegistrationForm /> },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}
