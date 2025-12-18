import {
  GroupOutlined,
  LogoutOutlined,
  ProjectOutlined,
  QrcodeOutlined,
  ReadOutlined,
  UsergroupDeleteOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { Link } from "react-router";

const Sidebar = () => {
  const [active, setActive] = useState<string>("");
  return (
    <div className="w-[17%]  border border-gray-100 shadow rounded-tl-lg rounded-bl-lg">
      <div className="flex flex-col">
        <div className="p-5 text-start font-bold text-3xl text-blue-700">
          Logo
        </div>
        <div className="flex flex-col h-screen">
          <div className="flex-1">
            <h2 className="p-5 text-gray-400 font-bold">DANH MỤC</h2>
            <ul className="pl-6 pr-4 flex flex-col gap-6 h-[500px] overflow-y-scroll">
              <li
                onClick={() => setActive("/admin")}
                className={
                  active === "/admin"
                    ? "bg-blue-500 text-white p-4 rounded-2xl"
                    : "hover:bg-blue-200 text-black p-4 rounded-2xl"
                }
              >
                <Link to="/admin">
                  <QrcodeOutlined className="pr-1" />
                  Trang quản trị
                </Link>
              </li>
              <li
                onClick={() => setActive("/admin/statistical")}
                className={
                  active === "/admin/statistical"
                    ? "bg-blue-500 text-white p-4 rounded-2xl"
                    : "hover:bg-blue-200 text-black p-4 rounded-2xl"
                }
              >
                <Link to="/admin/statistical">
                  <ProjectOutlined className="pr-1" />
                  Thống kê
                </Link>
              </li>
              <li
                onClick={() => setActive("/admin/books")}
                className={
                  active === "/admin/books"
                    ? "bg-blue-500 text-white p-4 rounded-2xl"
                    : "hover:bg-blue-200 text-black p-4 rounded-2xl"
                }
              >
                <Link to="/admin/books">
                  <ReadOutlined className="pr-1" />
                  Quản lý sách
                </Link>
              </li>
              <li
                onClick={() => setActive("/admin/categories")}
                className={
                  active === "/admin/categories"
                    ? "bg-blue-500 text-white p-4 rounded-2xl"
                    : "hover:bg-blue-200 text-black p-4 rounded-2xl"
                }
              >
                <Link to="/admin/categories">
                  <GroupOutlined className="pr-1" />
                  Quản lý thể loại sách
                </Link>
              </li>
              <li
                onClick={() => setActive("/admin/authors")}
                className={
                  active === "/admin/authors"
                    ? "bg-blue-500 text-white p-4 rounded-2xl"
                    : "hover:bg-blue-200 text-black p-4 rounded-2xl"
                }
              >
                <Link to="/admin/authors">
                  <UsergroupDeleteOutlined className="pr-1" />
                  Quản lý tác giả sách
                </Link>
              </li>
            </ul>
          </div>
          <div className="m-6">
            <Link to="" className="flex items-center justify-between">
              {" "}
              logout <LogoutOutlined />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
