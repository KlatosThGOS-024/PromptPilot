import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { HomePage } from "./Pages/HomePage";
import { SignUpPage } from "./Pages/SignUpPage";
import { LoginPage } from "./Pages/LoginPage";
import "./index.css";
import { UserProtectRouter } from "./context/UserProtectRouter";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<UserProtectRouter />}>
          <Route element={<HomePage />} path="/pilot"></Route>
          <Route element={<HomePage />} path="/c/:sessionId"></Route>
        </Route>

        <Route element={<SignUpPage />} path="/user/signUp"></Route>
        <Route element={<LoginPage />} path="/user/login"></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
