import {
  CommentOutlined,
  DownOutlined,
  GroupOutlined,
  MenuOutlined,
  ProjectOutlined,
  QrcodeOutlined,
  ReadOutlined,
  SolutionOutlined,
  UpOutlined,
  UsergroupDeleteOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { Link, useLocation } from "react-router";
import { useEyeStore } from "../../stores/eyeOpen";
import { useOpen } from "../../stores/openStore";

const Sidebar = () => {
  const { eye, setEye } = useEyeStore();
  const { openMenu1, openMenu2, setOpenMenu1, setOpenMenu2 } = useOpen();
  const localPath = useLocation();
  const [active, setActive] = useState<string>(localPath.pathname);

  return (
    <div
      className={`${
        eye === false ? "w-[17%] overflow-hidden" : "w-[5%] overflow-hidden"
      }  relative h-218 border border-gray-100 shadow rounded-tl-lg rounded-bl-lg duration-500 ease-in-out bg-[url(/bg.jpg)] bg-cover bg-no-repeat`}
    >
      <div className="text-blue-950">
        {eye == false ? (
          <MenuOutlined
            onClick={() => setEye(true)}
            className="absolute top-7 right-[5%] duration-500 ease-in-out font-bold text-2xl"
          />
        ) : (
          <MenuOutlined
            onClick={() => setEye(false)}
            className="absolute top-20 right-[35%] duration-500 ease-in-out font-bold text-2xl"
          />
        )}
      </div>
      {eye == false && (
        <div className="flex flex-col">
          <div className="p-5 text-start font-bold text-3xl text-blue-900">
            Logo
          </div>
          <div className="flex flex-col h-screen">
            <div className="flex-1 mt-4">
              <ul className="pl-6 pr-5 flex flex-col gap-4 h-150">
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
                <ul className="mt-2 mb-2">
                  <h2
                    className="pb-2 pr-2 flex items-center gap-3 text-center font-bold cursor-pointer"
                    onClick={() => setOpenMenu1(!openMenu1)}
                  >
                    Quản lý sách
                    {openMenu1 == false ? (
                      <DownOutlined className="text-[10px] font-bold" />
                    ) : (
                      <UpOutlined className="text-[10px] font-bold" />
                    )}
                  </h2>
                  {openMenu1 && (
                    <div>
                      <Link to="/admin/books">
                        <li
                          onClick={() => setActive("/admin/books")}
                          className={
                            active === "/admin/books"
                              ? "bg-blue-500 text-white p-4 rounded-2xl"
                              : "hover:bg-blue-200 text-black p-4 rounded-2xl"
                          }
                        >
                          <ReadOutlined className="pr-1" />
                          Quản lý sách
                        </li>
                      </Link>
                      <Link to="/admin/categories">
                        <li
                          onClick={() => setActive("/admin/categories")}
                          className={
                            active === "/admin/categories"
                              ? "bg-blue-500 text-white p-4 rounded-2xl"
                              : "hover:bg-blue-200 text-black p-4 rounded-2xl"
                          }
                        >
                          <GroupOutlined className="pr-1" />
                          Quản lý thể loại sách
                        </li>
                      </Link>
                      <Link to="/admin/authors">
                        <li
                          onClick={() => setActive("/admin/authors")}
                          className={
                            active === "/admin/authors"
                              ? "bg-blue-500 text-white p-4 rounded-2xl"
                              : "hover:bg-blue-200 text-black p-4 rounded-2xl"
                          }
                        >
                          <UsergroupDeleteOutlined className="pr-1" />
                          Quản lý tác giả sách
                        </li>
                      </Link>
                    </div>
                  )}
                </ul>
                <ul className="mb-2">
                  <h2
                    className="pb-2 pr-2 flex items-center gap-3 text-center font-bold cursor-pointer"
                    onClick={() => setOpenMenu2(!openMenu2)}
                  >
                    Quản lý người dùng
                    {openMenu2 == false ? (
                      <DownOutlined className="text-[10px] font-bold" />
                    ) : (
                      <UpOutlined className="text-[10px] font-bold" />
                    )}
                  </h2>
                  {openMenu2 && (
                    <div>
                      <Link to="/admin/users">
                        <li
                          onClick={() => setActive("/admin/users")}
                          className={
                            active === "/admin/users"
                              ? "bg-blue-500 text-white p-4 rounded-2xl"
                              : "hover:bg-blue-200 text-black p-4 rounded-2xl"
                          }
                        >
                          <UserSwitchOutlined className="pr-1" />
                          Quản lý tài khoản người dùng
                        </li>
                      </Link>
                      <Link to="/admin/dateBorrows">
                        <li
                          onClick={() => setActive("/admin/dateBorrows")}
                          className={
                            active === "/admin/dateBorrows"
                              ? "bg-blue-500 text-white p-4 rounded-2xl"
                              : "hover:bg-blue-200 text-black p-4 rounded-2xl"
                          }
                        >
                          <UsergroupDeleteOutlined className="pr-1" />
                          Quản lý người mượn trả sách
                        </li>
                      </Link>
                      <Link to="/admin/borrowItems">
                        <li
                          onClick={() => setActive("/admin/borrowItems")}
                          className={
                            active === "/admin/borrowItems"
                              ? "bg-blue-500 text-white p-4 rounded-2xl"
                              : "hover:bg-blue-200 text-black p-4 rounded-2xl"
                          }
                        >
                          <SolutionOutlined className="pr-1" /> Quản lý sách
                          được mượn
                        </li>
                      </Link>
                      <Link to="/admin/comments">
                        <li
                          onClick={() => setActive("/admin/comments")}
                          className={
                            active === "/admin/comments"
                              ? "bg-blue-500 text-white p-4 rounded-2xl"
                              : "hover:bg-blue-200 text-black p-4 rounded-2xl"
                          }
                        >
                          <CommentOutlined className="pr-1" /> Quản lý bình luận
                        </li>
                      </Link>
                    </div>
                  )}
                </ul>
              </ul>
            </div>
          </div>
        </div>
      )}
      {eye == true && (
        <div className="text-center">
          <div className="w-10 h-10 ml-4 mt-4 font-bold text-3xl text-blue-900 border rounded-full text-center">
            L
          </div>
          <div className="flex flex-col h-screen">
            <div className="flex-1">
              <ul className="mt-26 pl-4 pr-4 flex flex-col gap-6">
                <li
                  onClick={() => setActive("admin")}
                  className={`hover:bg-blue-100 hover:text-red-500 rounded-full w-10 h-10 text-center leading-11 ${
                    active == "admin" ? "text-red-500" : ""
                  }`}
                >
                  <Link to="/admin">
                    <QrcodeOutlined
                      className="text-[22px]"
                      title="Trang quản trị"
                    />
                  </Link>
                </li>
                <li
                  onClick={() => setActive("admin")}
                  className={`hover:bg-blue-100 hover:text-red-500 rounded-full w-10 h-10 text-center leading-11 ${
                    active == "admin" ? "text-red-500" : ""
                  }`}
                >
                  <Link to="/admin">
                    <ProjectOutlined className="text-[22px]" title="Thống kê" />
                  </Link>
                </li>
                <li
                  onClick={() => setActive("books")}
                  className={`hover:bg-blue-100 hover:text-red-500 rounded-full w-10 h-10 text-center leading-11 ${
                    active == "books" ? "text-red-500" : ""
                  }`}
                >
                  <Link to="/admin/books">
                    <ReadOutlined
                      className="text-[22px]"
                      title="Quản lý sách"
                    />
                  </Link>
                </li>
                <li
                  onClick={() => setActive("categories")}
                  className={`hover:bg-blue-100 hover:text-red-500 rounded-full w-10 h-10 text-center leading-11 ${
                    active == "categories" ? "text-red-500" : ""
                  }`}
                >
                  <Link to="/admin/categories">
                    <GroupOutlined
                      className="text-[22px]"
                      title="Quản lý thể loại sách"
                    />
                  </Link>
                </li>
                <li
                  onClick={() => setActive("authors")}
                  className={`hover:bg-blue-100 hover:text-red-500 rounded-full w-10 h-10 text-center leading-11 ${
                    active == "authors" ? "text-red-500" : ""
                  }`}
                >
                  <Link to="/admin/authors">
                    <UsergroupDeleteOutlined
                      className="text-[22px]"
                      title="Quản lý tác giả sách"
                    />
                  </Link>
                </li>
                <li
                  onClick={() => setActive("users")}
                  className={`hover:bg-blue-100 hover:text-red-500 rounded-full w-10 h-10 text-center leading-11 ${
                    active == "users" ? "text-red-500" : ""
                  }`}
                >
                  <Link to="/admin/users">
                    <UserSwitchOutlined
                      className="text-[22px]"
                      title="Quản lý tài khoản người dùng"
                    />
                  </Link>
                </li>
                <li
                  onClick={() => setActive("dateBorrows")}
                  className={`hover:bg-blue-100 hover:text-red-500 rounded-full w-10 h-10 text-center leading-11 ${
                    active == "dateBorrows" ? "text-red-500" : ""
                  }`}
                >
                  <Link to="/admin/dateBorrows">
                    <UsergroupDeleteOutlined
                      className="text-[22px]"
                      title="Quản lý người mượn trả sách"
                    />
                  </Link>
                </li>
                <li
                  onClick={() => setActive("borrowItems")}
                  className={`hover:bg-blue-100 hover:text-red-500 rounded-full w-10 h-10 text-center leading-11 ${
                    active == "borrowItems" ? "text-red-500" : ""
                  }`}
                >
                  <Link to="/admin/borrowItems">
                    <SolutionOutlined
                      className="text-[22px]"
                      title="Quản lý sách được mượn"
                    />
                  </Link>
                </li>
                <li
                  onClick={() => setActive("comments")}
                  className={`hover:bg-blue-100 hover:text-red-500 rounded-full w-10 h-10 text-center leading-11 ${
                    active == "comments" ? "text-red-500" : ""
                  }`}
                >
                  <Link to="/admin/comments">
                    <CommentOutlined
                      className="text-[20px]"
                      title="Quản lý bình luận"
                    />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
