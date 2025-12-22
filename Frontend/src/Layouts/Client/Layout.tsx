import React from "react";
import Header from "./Header";
import { Outlet } from "react-router";
import Footer from "./Footer";

const LayoutClient = () => {
  return (
    <>
      <Header />
      <main className="lg:max-w-7xl mx-auto mt-5 mb-5">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default LayoutClient;
