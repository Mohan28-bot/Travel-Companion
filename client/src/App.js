import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import HomePage from "./components/home/Home";
import LoginPage from "./components/auth/Login";
import SignupPage from "./components/auth/Signup";
import Dashboard from "./components/dashboard/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard/:username/:userid/*" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
