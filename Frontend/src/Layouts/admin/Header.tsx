import { BellOutlined, SearchOutlined } from "@ant-design/icons";
import React from "react";

const Header = () => {
  return (
    <div className="w-full h-18 border border-gray-100 shadow rounded-tr-lg flex items-center justify-between">
      <p className="text-[18px] ml-3 text-blue-600">Chào mừng quản trị viên!</p>
      <div className="mr-5 flex gap-5 items-center">
        <p className="text-center w-10 h-10 p-2 border border-gray-400 rounded-full cursor-pointer">
          <SearchOutlined />
        </p>
        <p className="bg-blue-500 w-10 h-10 rounded-full text-center leading-9">
          avt
        </p>
        <p className="text-center w-10 h-10 p-2 border border-gray-400 rounded-full cursor-pointer">
          <BellOutlined />
        </p>
      </div>
    </div>
  );
};

export default Header;
