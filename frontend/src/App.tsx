import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { HomePage } from "./Pages/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomePage />} path="/"></Route>
        <Route element={<HomePage />} path="/c/:id"></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
