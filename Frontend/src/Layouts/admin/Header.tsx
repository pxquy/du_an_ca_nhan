import { BellOutlined, SearchOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "../../constants/QueryKey";
import { Api } from "../../Api/api";
import { useEffect } from "react";
const Header = () => {
  const { data: user } = useQuery({
    queryKey: [QueryKey.ME],
    queryFn: async () => {
      const { data } = await Api.get("users/information");
      // console.log("data", data.data);
      return data.data;
    },
  });

  useEffect(() => {
    user;
  }, []);
  return (
    <div className="w-full h-18 border border-gray-100 shadow rounded-tr-lg flex items-center justify-between">
      <p className="text-[18px] ml-3 text-blue-900 font-bold">
        Chào mừng quản trị viên! {user?.name}
      </p>
      <div className="mr-5 flex gap-5 items-center">
        <p className="text-center w-10 h-10 p-2 border border-gray-400 rounded-full cursor-pointer">
          <SearchOutlined />
        </p>
        <p className="bg-blue-500 w-10 h-10 rounded-full text-center leading-9 overflow-hidden">
          {user?.image != "" ? (
            <img src={user?.image} alt={user?.name} />
          ) : (
            <img src={"/avt.jpg"} alt={user?.name} />
          )}
        </p>
        <p className="text-center w-10 h-10 p-2 border border-gray-400 rounded-full cursor-pointer">
          <BellOutlined />
        </p>
      </div>
    </div>
  );
};

export default Header;
