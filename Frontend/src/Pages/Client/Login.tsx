import { jwtDecode } from "jwt-decode";
import { useForm } from "react-hook-form";
import type { IUsers } from "../../Types/user";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryKey } from "../../constants/QueryKey";
import { message } from "antd";
import type { IErrorMessage } from "../../Types/data";
import { Api } from "../../Api/api";

const Login = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<IUsers>();
  const mutation = useMutation({
    mutationFn: async (dataLogin) => {
      const { data } = await Api.post(`auth/signin`, dataLogin, {
        withCredentials: true,
      });
      localStorage.setItem("token", data.token);
      return data;
    },
    onSuccess: (login) => {
      message.success("Đăng nhập thành công"),
        queryClient.setQueryData([QueryKey.USERS], () => login);

      const token = localStorage.getItem("token");
      if (!token) {
        return null;
      }
      const user = jwtDecode<IUsers>(token);
      if (user.role === "0") {
        return navigate("/admin");
      }
      {
        return navigate("/");
      }
    },
    onError: (error: IErrorMessage) => {
      const err = error.response?.message as IErrorMessage;
      message.error(err.message || "Có lỗi khi đăng nhập!");
    },
  });

  const onSubmit = (data: IUsers) => {
    mutation.mutate(data as any);
  };
  return (
    <section>
      <div className="w-230 mx-auto border border-gray-300 rounded-3xl flex justify-between">
        <div className="shadow p-5 rounded-3xl w-[57%]">
          <h2 className="text-center font-bold text-2xl p-2">Đăng nhập</h2>
          <div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-3"
            >
              <div className="flex flex-col gap-1">
                <label htmlFor="" className="pl-2">
                  Email(*)
                </label>
                <input
                  type="email"
                  {...register("email")}
                  autoComplete="current-email"
                  placeholder="Nhập email người dùng..."
                  className="border border-gray-300 focus:outline-none rounded-3xl p-1"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="" className="pl-2">
                  Mật khẩu(*)
                </label>
                <input
                  type="password"
                  {...register("password")}
                  autoComplete="current-password"
                  placeholder="Nhập mật khẩu người dùng..."
                  className="border border-gray-300 focus:outline-none rounded-3xl p-1"
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="w-50 p-2 text-white rounded-2xl font-bold bg-red-400 cursor-pointer hover:bg-red-500"
                >
                  Đăng Nhập
                </button>
              </div>
            </form>
            <div className="m-2 mt-5">
              <p className="flex gap-2 items-center ml-25">
                <span>Đăng ký nếu không có tài khoản?</span>
                <Link
                  to="/register"
                  className="text-blue-400 hover:text-blue-600 font-bold"
                >
                  Tại đây!
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="w-[40%]">
          <img
            src="data:image/jpeg;base64,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"
            alt=""
            className="w-100 h-full object-cover rounded-3xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Login;
