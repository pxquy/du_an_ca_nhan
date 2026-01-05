import { useQuery } from "@tanstack/react-query";
import { API, QueryKey } from "../../constants/QueryKey";
import axios from "axios";
import type { IApiResponse, IResponse } from "../../Types/data";
import type { ICategories } from "../../Types/categories";
import { Link, useLocation, useNavigate } from "react-router";
import { SearchOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { message } from "antd";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const Header = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { data: categories, isLoading } = useQuery({
    queryKey: [QueryKey.CATEGORIES],
    queryFn: async () => {
      const { data } = await axios.get<IApiResponse<IResponse<ICategories>>>(
        `${API}/categories`
      );
      return data.data;
    },
  });

  const token = localStorage.getItem("token");
  // console.log("token", token);
  useEffect(() => {
    const checkLogin = async () => {
      try {
        await axios.get(`${API}/users/information`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIsLogin(true);
      } catch (error) {
        console.log(error);
      }
    };
    checkLogin();
  }, [location.pathname]);

  const handleClickLogout = async () => {
    try {
      await axios.post(`${API}/auth/logout`, {}, { withCredentials: true });
      message.success("Đăng Xuất thành công!");
      setIsLogin(false);
      navigate("/login");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  if (isLoading) {
    return <span>Đang tải dữ liệu...</span>;
  }
  return (
    <header className="shadow-lg">
      <div className="flex lg:max-w-7xl mx-auto justify-between items-center">
        <div className="p-7 font-bold text-blue-600 text-3xl">LOGO</div>
        <div>
          <ul className="flex items-center gap-10">
            {categories?.docs.map((c, index) => (
              <li key={index}>
                <Link to="" className="font-bold hover:text-red-400">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <form action="" className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm sách..."
              className="w-100 border border-gray-200 rounded-3xl focus:outline-none placeholder:p-2"
            />
            <button className="absolute top-0 right-2 text-gray-400">
              <SearchOutlined />
            </button>
          </form>
        </div>
        <div className="flex items-center gap-3">
          <div className="group relative">
            <p className="w-10 h-10 rounded-full bg-blue-400 text-center leading-10 text-white">
              avt
            </p>
            <div className="absolute hidden top-10  group-hover:block">
              <ul className="w-25 border hid border-gray-400 rounded-[5px] mt-2 bg-white">
                <li className="">
                  {isLogin ? (
                    <button
                      onClick={handleClickLogout}
                      className="cursor-pointer"
                    >
                      Đăng xuất
                    </button>
                  ) : (
                    <Link to="/login" className="cursor-pointer">
                      Đăng nhập
                    </Link>
                  )}
                </li>
              </ul>
            </div>
          </div>
          <div className="text-2xl">
            <ShoppingCartOutlined />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
