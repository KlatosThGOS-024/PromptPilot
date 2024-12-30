import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { HomePage } from "./Pages/HomePage";
import { SignUpPage } from "./Pages/SignUpPage";
import { LoginPage } from "./Pages/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomePage />} path="/pilot"></Route>
        <Route element={<HomePage />} path="/c/:sessionId"></Route>
        <Route element={<SignUpPage />} path="/user/signUp"></Route>
        <Route element={<LoginPage />} path="/user/login"></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
