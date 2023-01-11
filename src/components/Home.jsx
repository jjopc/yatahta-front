import React from "react";
import { isStaff } from "../services/AuthService";
import DoctorDashboard from "./DoctorDashboard";
import PatientDashboard from "./PatientDashboard";

export default function Home() {
  if (isStaff()) {
    return <DoctorDashboard />;
  }

  return <PatientDashboard />;
}
