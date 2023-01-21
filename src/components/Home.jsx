import React from "react";
import { isStaff } from "../features/auth/services/authService";
import DoctorDashboard from "../features/doctors/components/Dashboard";
import Landing from "./Landing";
import PatientDashboard from "../features/patients/components/Dashboard";
import Layout from "./ui/Layout";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../features/auth/state/authSlice";

export default function Home({ children }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (!isLoggedIn) {
    return (
      <Layout>
        <Landing />
      </Layout>
    );
  }

  return (
    <Layout>{isStaff() ? <DoctorDashboard /> : <PatientDashboard />}</Layout>
  );
}
