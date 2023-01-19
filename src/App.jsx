import { Routes, Route } from "react-router-dom";
import LogIn from "./components/LogIn";

import "./App.css";
import DoctorPatients from "./components/DoctorPatients";
import Home from "./components/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/log-in" element={<LogIn />} />
      <Route path="/patients" element={<DoctorPatients />} />
    </Routes>
  );
}

export default App;
