import React from "react";
import { isStaff } from "../services/AuthService";
import DoctorDashboard from "./DoctorDashboard";
import Landing from "./Landing";
import PatientDashboard from "./PatientDashboard";
import Layout from "./ui/Layout";

export default function Home({ isLoggedIn, logOut, children }) {
  if (!isLoggedIn) {
    return <Landing />;
  }

  return (
    <Layout isLoggedIn={isLoggedIn} logOut={logOut}>
      {isStaff() ? <DoctorDashboard /> : <PatientDashboard />}
    </Layout>
  );
}
