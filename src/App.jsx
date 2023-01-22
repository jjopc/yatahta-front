import { Routes, Route } from "react-router-dom";
import LogIn from "./features/auth/components/LogIn";

import "./App.css";
import PatientList from "./features/doctors/components/PatientsList";
import PatientProfile from "./features/doctors/components/PatientProfile";
import Home from "./components/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/log-in" element={<LogIn />} />
      <Route path="/patients" element={<PatientList />} />
      <Route path="/patients/:userId" element={<PatientProfile />} />
    </Routes>
  );
}

export default App;
