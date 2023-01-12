import React from "react";
import Header from "./containers/Header";
import Landing from "../Landing";
import Home from "../Home";

export default function Layout({ isLoggedIn, logOut, children }) {
  return (
    <>
      <Header isLoggedIn={isLoggedIn} logOut={logOut} />
      {children}
    </>
  );
}
