import React, { useEffect, useState } from "react";
import { getDoctorPatients } from "../services/DoctorService";
import Layout from "./ui/Layout";

export default function DoctorPatients() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const loadPatients = async () => {
      const { response, isError } = await getDoctorPatients();
      if (!isError) {
        setPatients(response.data);
      } else {
        setPatients([]);
      }
    };

    loadPatients();
  }, []);

  // TODO: Tengo que ir pensando en el context o manejo de estado para no ir pasando constantemente
  // en props si está logueado, etc.
  return (
    <Layout>
      <h1>Lista de pacientes</h1>
    </Layout>
  );
}
