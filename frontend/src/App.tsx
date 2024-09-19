import { ThemeProvider } from "@mui/joy";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CurrentStatusPage from "./pages/CurrentStatusPage";
import LoginForm from "./components/Register/LoginForm";
import RegisterForm from "./components/Register/RegisterForm";
import WelcomePageLayout from "./pages/WelcomePageLayout";
import WelcomeButtons from "./components/Register/WelcomeButtons";
import "./App.css";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      children: [
        { index: true, element: <CurrentStatusPage /> },
        {
          path: "auth",
          element: <WelcomePageLayout />,
          children: [
            { index: true, element: <WelcomeButtons /> },
            { path: "login", element: <LoginForm /> },
            { path: "register", element: <RegisterForm /> },
          ],
        },
      ],
    },
  ]);
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
