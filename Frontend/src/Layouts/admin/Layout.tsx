import React from "react";
import Header from "./Header";
import { Outlet } from "react-router";
import Sidebar from "./Sidebar";

const LayoutAdmin = () => {
  return (
    <>
      <div className="flex m-2 bg-[url(/bg2.jpg)] bg-no-repeat bg-cover object-cover">
        <Sidebar />
        <div className="flex-1">
          <div>
            <Header />
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default LayoutAdmin;
