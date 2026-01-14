import { jwtDecode } from "jwt-decode";
import { useForm } from "react-hook-form";
import type { IToken, IUsers } from "../../Types/user";
import { Link, useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryKey } from "../../constants/QueryKey";
import { message } from "antd";
import type { IErrorMessage } from "../../Types/data";
import { Api } from "../../Api/api";
import { useEyeStore } from "../../stores/eyeOpen";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import {
  validateLogin,
  type LoginValidate,
} from "../../libs/validations/validateAuth";
import { zodResolver } from "@hookform/resolvers/zod";

const Login = () => {
  const queryClient = useQueryClient();
  const { eye, setEye } = useEyeStore();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValidate>({
    resolver: zodResolver(validateLogin),
  });
  const mutation = useMutation({
    mutationFn: async (dataLogin) => {
      const { data } = await Api.post(`auth/signin`, dataLogin, {
        withCredentials: true,
      });
      localStorage.setItem("token", data.token);
      return data;
    },
    onSuccess: () => {
      message.success("Đăng nhập thành công"),
        queryClient.invalidateQueries({
          queryKey: [QueryKey.USERS],
        });

      const token = localStorage.getItem("token");
      if (!token) {
        return null;
      }
      const user = jwtDecode<IToken>(token);

      console.log("user", user);
      if (user.role === "0") {
        return navigate("/admin");
      }
      {
        return navigate("/");
      }
    },
    onError: (error: IErrorMessage) => {
      const err = error.response?.data as IErrorMessage;
      message.error(err.message || "Có lỗi khi đăng nhập!");
    },
  });

  const onSubmit = (data: LoginValidate) => {
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
                />{" "}
                {errors.email && (
                  <p className="w-full text-red-500 text-[14px]  pl-2">
                    {errors?.email.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="" className="pl-2">
                  Mật khẩu(*)
                </label>
                <div className="relative">
                  <input
                    type={eye === false ? "password" : "text"}
                    {...register("password")}
                    autoComplete="current-password"
                    placeholder="Nhập mật khẩu người dùng..."
                    className="w-full border border-gray-300 focus:outline-none rounded-3xl p-1"
                  />
                  <span className="absolute inset-y-1 right-3">
                    {eye == false ? (
                      <EyeInvisibleOutlined onClick={() => setEye(true)} />
                    ) : (
                      <EyeOutlined onClick={() => setEye(false)} />
                    )}
                  </span>
                </div>
                {errors.password && (
                  <p className="w-full text-red-500 text-[14px] pl-2">
                    {errors?.password.message}
                  </p>
                )}
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="w-50 p-2 mt-5 text-white rounded-2xl font-bold bg-red-400 cursor-pointer hover:bg-red-500"
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
            src="/imageLogin.jpg"
            alt=""
            className="w-100 h-full object-cover rounded-3xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Login;
