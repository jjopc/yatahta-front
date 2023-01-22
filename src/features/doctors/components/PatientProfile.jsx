import React from "react";
import { useParams } from "react-router-dom";

function PatientProfile() {
  const { userId } = useParams();

  return <div>PatientProfile</div>;
}

export default PatientProfile;
