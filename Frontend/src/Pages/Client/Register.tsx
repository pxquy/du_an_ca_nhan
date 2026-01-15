import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { QueryKey } from "../../constants/QueryKey";
import { message } from "antd";
import type { IErrorMessage } from "../../Types/data";
import { useState } from "react";
import { Api } from "../../Api/api";
import { useEyeStore } from "../../stores/eyeOpen";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  validateRegister,
  type RegisterValidate,
} from "../../libs/validations/validateAuth";

const Register = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterValidate>({
    resolver: zodResolver(validateRegister),
  });
  const queryClient = useQueryClient();
  const { eye, eyeConfirm, setEye, setEyeConfirm } = useEyeStore();
  const mutation = useMutation({
    mutationFn: async (dataRegister) => {
      const { data } = await Api.post(`auth/signup`, dataRegister);
      return data;
    },
    onSuccess: (register) => {
      message.success("Đăng ký thành công"),
        queryClient.setQueryData([QueryKey.USERS], () => register);
      navigate("/");
    },
    onError: (error: IErrorMessage) => {
      const err = error.response?.message as IErrorMessage;
      message.error(err.message || "Có lỗi khi đăng ký!");
    },
  });

  const onSubmit = (data: RegisterValidate) => {
    // console.log(data);
    mutation.mutate(data as any);
  };

  const handelImage = async (file: FileList) => {
    setLoading(true);
    const formData = new FormData();
    // console.log(file);
    formData.append("file", file[0]);
    formData.append("upload_preset", "Image_libery");

    try {
      const { data } = await axios.post(
        `https://api.cloudinary.com/v1_1/djnwxedym/image/upload`,
        formData
      );
      reset({
        image: data.url,
      });
      setImage(data.url);
    } catch (error) {
      console.error("Lỗi khi thêm ảnh!");
    }
  };

  return (
    <>
      <section className="pt-4 pb-4">
        <div className="w-250 mx-auto border border-gray-300 rounded-3xl flex justify-between bg-white">
          <div className="shadow p-5 w-[55%] rounded-tl-3xl rounded-bl-3xl">
            <h2 className="text-center font-bold text-2xl p-4">Đăng ký</h2>
            <div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-3"
              >
                <div className="flex flex-col gap-1">
                  <label htmlFor="" className="pl-4">
                    Tên người dùng(*)
                  </label>
                  <input
                    type="text"
                    {...register("name")}
                    placeholder="Nhập tên người dùng..."
                    className="border border-gray-300 focus:outline-none rounded-3xl p-1 pl-3"
                  />
                  {errors.name && (
                    <p className="text-red-500  text-[14px] pl-3">
                      {errors?.name.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="" className="pl-4">
                    Email(*)
                  </label>
                  <input
                    type="email"
                    {...register("email")}
                    placeholder="Nhập email người dùng..."
                    className="border border-gray-300 focus:outline-none rounded-3xl p-1 pl-3"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-[14px]  pl-3">
                      {errors?.email.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <label className="pl-4">Mật khẩu(*)</label>

                  <div className="relative">
                    <input
                      type={eye ? "text" : "password"}
                      {...register("password")}
                      placeholder="Nhập mật khẩu..."
                      className="w-full border border-gray-300 focus:outline-none rounded-3xl p-1 pr-10 pl-3"
                    />

                    <span className="absolute inset-y-0 right-3 flex items-center cursor-pointer">
                      {eye ? (
                        <EyeOutlined onClick={() => setEye(false)} />
                      ) : (
                        <EyeInvisibleOutlined onClick={() => setEye(true)} />
                      )}
                    </span>
                  </div>

                  {errors.password && (
                    <p className="text-red-500 text-sm pl-3">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <label className="pl-4">Nhập lại mật khẩu(*)</label>

                  <div className="relative">
                    <input
                      type={eyeConfirm ? "text" : "password"}
                      {...register("confirm_password")}
                      placeholder="Nhập lại mật khẩu..."
                      className="w-full border border-gray-300 focus:outline-none rounded-3xl p-1 pr-10 pl-3"
                    />

                    <span className="absolute inset-y-0 right-3 flex items-center cursor-pointer">
                      {eyeConfirm ? (
                        <EyeOutlined onClick={() => setEyeConfirm(false)} />
                      ) : (
                        <EyeInvisibleOutlined
                          onClick={() => setEyeConfirm(true)}
                        />
                      )}
                    </span>
                  </div>

                  {errors.confirm_password && (
                    <p className="text-red-500 text-sm pl-3">
                      {errors.confirm_password.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="" className="pl-4">
                    Số điện thoại(*)
                  </label>
                  <input
                    type="text"
                    {...register("numberPhone")}
                    placeholder="0399001001"
                    className="border border-gray-300 focus:outline-none rounded-3xl p-1 pl-3"
                  />
                  {errors.numberPhone && (
                    <p className="text-red-500 text-[14px]  pl-3">
                      {errors?.numberPhone.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="" className="pl-2">
                    Hình ảnh
                  </label>
                  <input
                    type="file"
                    onChange={(e) => {
                      if (e.target.files) {
                        handelImage(e.target.files);
                      }
                    }}
                    className="border border-gray-300 focus:outline-none rounded-3xl p-1"
                  />
                  {loading ? <span>Đang tải ảnh...</span> : ""}
                  {image && (
                    <img
                      src={image}
                      onLoad={() => setLoading(false)}
                      className="w-30 rounded-3xl"
                    />
                  )}
                  <input
                    type="text"
                    hidden
                    {...register("image")}
                    name=""
                    id=""
                  />
                  {errors.image && (
                    <p className="text-red-500 text-[14px] pl-2">
                      {errors?.image.message}
                    </p>
                  )}
                </div>
                <div className="text-center mt-5">
                  <button
                    type="submit"
                    className="w-50 p-2 text-white rounded-2xl font-bold bg-red-400 cursor-pointer hover:bg-red-500"
                  >
                    Đăng ký
                  </button>
                </div>
              </form>
              <div className="m-2 mt-5">
                <p className="flex gap-2 items-center ml-25">
                  <span>Đăng nhập nếu có tài khoản?</span>
                  <Link
                    to="/"
                    className="text-blue-400 hover:text-blue-600 font-bold"
                  >
                    Tại đây!
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <div className="w-[45%]">
            <img
              src="./imageRegister.jpeg"
              alt=""
              className="w-150 h-full  rounded-tr-3xl rounded-br-3xl"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
