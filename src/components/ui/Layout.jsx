import React from "react";
import { Container } from "react-bootstrap";
import Header from "./containers/Header";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
