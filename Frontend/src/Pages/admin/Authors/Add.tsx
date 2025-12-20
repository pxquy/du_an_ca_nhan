import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router";
import { useState } from "react";
import type { IAuthors } from "../../../Types/authors";

const AddAuthor = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState();
  const { register, handleSubmit } = useForm<IAuthors>();

  const onSubmit = () => {};

  return (
    <>
      <section className="w-150 h-125 shadow border border-gray-300 rounded-2xl bg-white overflow-scroll">
        <div>
          <h2 className="text-center p-2 text-2xl font-bold">
            Thêm tác giả mới
          </h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="shadow-lg rounded-2xl m-2">
            <p className="p-2 text-gray-500 font-bold">Phần tử chính</p>
            <div className="flex flex-col m-2 gap-1">
              <label htmlFor="" className="ml-2">
                Tên tác giả(*)
              </label>
              <input
                type="text"
                {...register("name")}
                placeholder="Nhập tên tác giả..."
                className="border border-gray-400 rounded-2xl p-1 focus:outline-none"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-col m-2 gap-1">
                <label htmlFor="" className="ml-2">
                  Email(*)
                </label>
                <input
                  type="*email"
                  {...register("email")}
                  placeholder="1000"
                  className="border border-gray-400 rounded-2xl p-1 focus:outline-none w-40"
                />
              </div>
              <div className="flex flex-col m-2 gap-1">
                <label htmlFor="" className="ml-2">
                  Ngày xuất bản(*)
                </label>
                <input
                  type="date"
                  {...register("birthday")}
                  className="border border-gray-400 rounded-2xl p-1 focus:outline-none w-40"
                />
              </div>
            </div>
          </div>
          <div className="shadow-lg rounded-2xl m-2">
            <p className="p-2 text-gray-500 font-bold">Phần tử liên quan</p>

            <div className="flex items-center justify-between">
              <div className="flex flex-col m-2 gap-1">
                <label htmlFor="" className="ml-2">
                  Số điện thoại
                </label>
                <input
                  type="number"
                  {...register("numberPhone")}
                  placeholder="1000"
                  className="border border-gray-400 rounded-2xl p-1 focus:outline-none w-40"
                />
              </div>
            </div>
          </div>
          {/* <div className="shadow-lg rounded-2xl flex flex-col m-2 gap-1">
            <label htmlFor="" className="ml-2">
              Mô tả
            </label>
            <textarea
              name=""
              id=""
              rows={4}
              className="border border-gray-200 focus:outline-none rounded-2xl"
            ></textarea>
          </div> */}
          <div className="shadow-lg rounded-2xl m-2 pb-5 pt-5 flex gap-3">
            <button
              onClick={() => navigate("/admin/authors")}
              className="border border-gray-300 p-3 rounded-2xl cursor-pointer hover:bg-gray-100 ml-5"
            >
              Đóng
            </button>
            <button className="bg-blue-500 text-white p-3 rounded-2xl cursor-pointer hover:bg-blue-600">
              Thêm mới sách
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddAuthor;
