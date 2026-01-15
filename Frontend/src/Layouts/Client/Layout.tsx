import { Outlet } from "react-router";

const LayoutClient = () => {
  return (
    <>
      <div className="bg-[url(/bg_lib.jpg)] bg-no-repeat bg-cover h-auto">
        <main className="lg:max-w-7xl mx-auto">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default LayoutClient;
