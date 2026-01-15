import { BellOutlined, SearchOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "../../constants/QueryKey";
import { Api } from "../../Api/api";
import { message } from "antd";
import { Link, useNavigate } from "react-router";
const Header = () => {
  const navigate = useNavigate();
  const { data: user } = useQuery({
    queryKey: [QueryKey.ME],
    queryFn: async () => {
      const { data } = await Api.get("users/information");
      // console.log("data", data.data);
      return data.data;
    },

    enabled: !!localStorage.getItem("token"),
  });
  const handleLogout = async () => {
    try {
      await Api.post(`auth/logout`, {}, { withCredentials: true });
      message.success("Đăng Xuất thành công!");
      localStorage.removeItem("token");
      navigate("/");
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <div className="w-full h-18 border border-gray-100 shadow rounded-tr-lg flex items-center justify-between">
      <div className="ml-6">
        <p className="relative flex">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="border rounded-3xl placeholder:p-2 w-120 p-1 pl-3 focus:outline-none border-blue-950"
          />
          <button className="absolute top-1 right-4 cursor-pointer">
            <SearchOutlined />
          </button>
        </p>
      </div>
      <div className="group relative mr-5 flex gap-5 items-center">
        <p className="text-center w-10 h-10 p-2 border border-gray-400 rounded-full cursor-pointer">
          <BellOutlined />
        </p>
        <div className="w-10 h-10 bg-blue-500 rounded-full overflow-hidden text-center leading-9 cursor-pointer">
          {user?.image != "" ? (
            <img src={user?.image} alt={user?.name} />
          ) : (
            <img src={"/avt.jpg"} alt={user?.name} />
          )}
        </div>
        <div className="box_menu w-50 absolute top-12 right-0 hidden  group-hover:block z-90">
          <ul className="flex flex-col gap-2 rounded-2xl p-3 bg-white">
            <li>
              <Link to="">Hồ sơ cá nhân</Link>
            </li>
            <li>
              <button onClick={() => handleLogout()} className="cursor-pointer">
                Đăng xuất
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
