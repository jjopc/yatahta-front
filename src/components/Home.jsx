import React from "react";
import { isStaff } from "../services/AuthService";
import DoctorDashboard from "./DoctorDashboard";
import Landing from "./Landing";
import PatientDashboard from "./PatientDashboard";
import Layout from "./ui/Layout";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../state/authSlice";

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
