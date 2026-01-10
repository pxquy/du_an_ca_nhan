import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { QueryKey } from "../../constants/QueryKey";
import { message } from "antd";
import type { IErrorMessage } from "../../Types/data";
import type { IUsers } from "../../Types/user";
import { useState } from "react";
import { Api } from "../../Api/api";
import { useEyeStore } from "../../stores/eyeOpen";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

const Register = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const { register, handleSubmit, reset } = useForm<IUsers>();
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
      navigate("/login");
    },
    onError: (error: IErrorMessage) => {
      const err = error.response?.message as IErrorMessage;
      message.error(err.message || "Có lỗi khi đăng ký!");
    },
  });

  const onSubmit = (data: unknown) => {
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
      <section>
        <div className="w-250 mx-auto border border-gray-300 rounded-3xl flex justify-between">
          <div className="shadow p-5 w-[55%] rounded-tl-3xl rounded-bl-3xl">
            <h2 className="text-center font-bold text-2xl p-2">Đăng ký</h2>
            <div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-3"
              >
                <div className="flex flex-col gap-1">
                  <label htmlFor="" className="pl-2">
                    Tên người dùng(*)
                  </label>
                  <input
                    type="text"
                    {...register("name")}
                    placeholder="Nhập tên người dùng..."
                    className="border border-gray-300 focus:outline-none rounded-3xl p-1"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="" className="pl-2">
                    Email(*)
                  </label>
                  <input
                    type="email"
                    {...register("email")}
                    placeholder="Nhập email người dùng..."
                    className="border border-gray-300 focus:outline-none rounded-3xl p-1"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="" className="pl-2">
                    Mật khẩu(*)
                  </label>
                  <input
                    type={eye == false ? "password" : "text"}
                    {...register("password")}
                    placeholder="Nhập email người dùng..."
                    className="relative border border-gray-300 focus:outline-none rounded-3xl p-1"
                  />
                  <div className="absolute top-90 left-[50%]">
                    {eye == false ? (
                      <EyeInvisibleOutlined onClick={() => setEye(true)} />
                    ) : (
                      <EyeOutlined onClick={() => setEye(false)} />
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="" className="pl-2">
                    Nhập lại mật khẩu(*)
                  </label>
                  <input
                    type={eyeConfirm === false ? "password" : "text"}
                    {...register("confirm_password")}
                    placeholder="Nhập email người dùng..."
                    className="relative border border-gray-300 focus:outline-none rounded-3xl p-1"
                  />
                  <div className="absolute top-109 left-[50%]">
                    {eyeConfirm == false ? (
                      <EyeInvisibleOutlined
                        onClick={() => setEyeConfirm(true)}
                      />
                    ) : (
                      <EyeOutlined onClick={() => setEyeConfirm(false)} />
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="" className="pl-2">
                    Ngày sinh
                  </label>
                  <input
                    type="date"
                    {...register("birthday")}
                    className="border border-gray-300 focus:outline-none rounded-3xl p-1"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="" className="pl-2">
                    Số điện thoại(*)
                  </label>
                  <input
                    type="number"
                    {...register("numberPhone")}
                    placeholder="0399001001"
                    className="border border-gray-300 focus:outline-none rounded-3xl p-1"
                  />
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
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="" className="pl-2">
                    Địa chỉ
                  </label>
                  <input
                    type="text"
                    placeholder="Nhập địa người dùng..."
                    className="border border-gray-300 focus:outline-none rounded-3xl p-1"
                  />
                </div>
                <div className="flex items-center gap-5">
                  <label htmlFor="" className="pl-2">
                    Giới tính:
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="1"
                      checked
                      {...register("gender")}
                    />
                    <p>Nam</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="radio" value="2" {...register("gender")} />
                    <p>Nữ</p>
                  </div>
                </div>
                <div className="text-center">
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
                    to="/login"
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
