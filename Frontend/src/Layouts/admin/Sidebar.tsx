import {
  CommentOutlined,
  GroupOutlined,
  LeftCircleOutlined,
  LogoutOutlined,
  ProjectOutlined,
  QrcodeOutlined,
  ReadOutlined,
  RightCircleOutlined,
  SolutionOutlined,
  UsergroupDeleteOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useEyeStore } from "../../stores/eyeOpen";
import { Api } from "../../Api/api";
import { message } from "antd";

const Sidebar = () => {
  const { eye, setEye } = useEyeStore();
  const navigate = useNavigate();
  const localPath = useLocation();
  const [active, setActive] = useState<string>(localPath.pathname);

  const handleClickLogout = async () => {
    try {
      await Api.post(`auth/logout`, {}, { withCredentials: true });
      message.success("Đăng Xuất thành công!");
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <div
      className={`${
        eye === false ? "w-[17%] overflow-hidden" : "w-[5%] overflow-hidden"
      }  relative border border-gray-100 shadow rounded-tl-lg rounded-bl-lg bg-[url(/bg.jpg)] bg-cover bg-no-repeat`}
    >
      <div className="absolute top-15 right-[5%] font-bold text-3xl text-blue-900">
        {eye == false ? (
          <LeftCircleOutlined onClick={() => setEye(true)} />
        ) : (
          <RightCircleOutlined onClick={() => setEye(false)} />
        )}
      </div>
      <div className="flex flex-col">
        <div className="p-5 text-start font-bold text-3xl text-blue-900">
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
                onClick={() => setActive("/admin")}
                className={
                  active === "/admin"
                    ? "bg-blue-500 text-white p-4 rounded-2xl"
                    : "hover:bg-blue-200 text-black p-4 rounded-2xl"
                }
              >
                <Link to="/admin">
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
              <li
                onClick={() => setActive("/admin/users")}
                className={
                  active === "/admin/users"
                    ? "bg-blue-500 text-white p-4 rounded-2xl"
                    : "hover:bg-blue-200 text-black p-4 rounded-2xl"
                }
              >
                <Link to="/admin/users">
                  <UserSwitchOutlined className="pr-1" />
                  Quản lý người dùng
                </Link>
              </li>
              <li
                onClick={() => setActive("/admin/dateBorrows")}
                className={
                  active === "/admin/dateBorrows"
                    ? "bg-blue-500 text-white p-4 rounded-2xl"
                    : "hover:bg-blue-200 text-black p-4 rounded-2xl"
                }
              >
                <Link to="/admin/dateBorrows">
                  <UsergroupDeleteOutlined className="pr-1" />
                  Quản lý người mượn trả sách
                </Link>
              </li>
              <li
                onClick={() => setActive("/admin/borrowItems")}
                className={
                  active === "/admin/borrowItems"
                    ? "bg-blue-500 text-white p-4 rounded-2xl"
                    : "hover:bg-blue-200 text-black p-4 rounded-2xl"
                }
              >
                <Link to="/admin/borrowItems">
                  <SolutionOutlined className="pr-1" /> Quản lý sách được mượn
                </Link>
              </li>
              <li
                onClick={() => setActive("/admin/comments")}
                className={
                  active === "/admin/comments"
                    ? "bg-blue-500 text-white p-4 rounded-2xl"
                    : "hover:bg-blue-200 text-black p-4 rounded-2xl"
                }
              >
                <Link to="/admin/comments">
                  <CommentOutlined className="pr-1" /> Quản lý bình luận
                </Link>
              </li>
            </ul>
          </div>
          <div className="m-6">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => handleClickLogout()}
            >
              {" "}
              logout <LogoutOutlined />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
