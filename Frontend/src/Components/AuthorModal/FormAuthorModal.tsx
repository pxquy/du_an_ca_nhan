import type { ReactElement } from "react";
import { useOpen } from "../../stores/openStore";
import type { TGlobalProps } from "../../Types/React";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import type { IAuthors } from "../../Types/authors";
import { useForm } from "react-hook-form";
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import type { IApiResponse, IErrorMessage, IResponse } from "../../Types/data";
import axios from "axios";
import { API, QueryKey } from "../../constants/QueryKey";
import { message } from "antd";

export const AddAuthorModal = ({
  children,
}: TGlobalProps<{ open: boolean }>) => {
  const { openAdd, setOpenAdd } = useOpen();
  const { register, handleSubmit } = useForm<IAuthors>();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (formDataAuthor) => {
      const { data } = await axios.post<IApiResponse<IResponse<IAuthors>>>(
        `${API}/authors`,
        formDataAuthor,
        {
          withCredentials: true,
        }
      );
      return data;
    },
    onSuccess: (author) => {
      setOpenAdd(false);
      message.success("Thêm tác giả thành công");
      queryClient.invalidateQueries({
        queryKey: [QueryKey.AUTHORS],
      });
      queryClient.setQueryData([QueryKey.AUTHORS], (data: IAuthors[]) => {
        return data && [...data, author];
      });
    },
    onError: (error: IErrorMessage) => {
      const err = error?.response.data as IErrorMessage;
      message.error(err.message || "Lỗi khi thêm tác giả!");
    },
  });

  const onSubmit = (data: IAuthors) => {
    mutation.mutate(data as any);
  };
  return (
    <>
      {React.cloneElement(
        children as ReactElement,
        {
          onclick: () => {
            setOpenAdd(true);
          },
        } as { onclick: () => void }
      )}

      <div
        onClick={() => setOpenAdd(false)}
        className={`fixed w-screen h-screen bg-black/50 duration-300 z-20 top-0 left-0 ${
          openAdd ? "opacity-100 visited:" : "opacity-0 invisible"
        }`}
      ></div>

      {openAdd && (
        <section className="fixed top-[15%] left-[35%] w-150 h-125 z-30 shadow border border-gray-300 rounded-2xl bg-white overflow-scroll">
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
                    type="email"
                    {...register("email")}
                    placeholder="Nhập email tác giả..."
                    className="border border-gray-400 rounded-2xl p-1 focus:outline-none w-40"
                  />
                </div>
                <div className="flex flex-col m-2 gap-1">
                  <label htmlFor="" className="ml-2">
                    Ngày sinh(*)
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
                    placeholder="0303030311"
                    className="border border-gray-400 rounded-2xl p-1 focus:outline-none w-40"
                  />
                </div>
              </div>
            </div>
            <div className="shadow-lg rounded-2xl m-2 pb-5 pt-5 flex gap-3">
              <button
                type="button"
                onClick={() => setOpenAdd(false)}
                className="border border-gray-300 p-3 rounded-2xl cursor-pointer hover:bg-gray-100 ml-5"
              >
                Đóng
              </button>
              <button className="bg-blue-500 text-white p-3 rounded-2xl cursor-pointer hover:bg-blue-600">
                Thêm tác giả
              </button>
            </div>
          </form>
        </section>
      )}
    </>
  );
};

export const EditAuthorModal = ({
  children,
  author,
}: TGlobalProps<{ open: boolean; author: IAuthors }>) => {
  const { openEdit, setOpenEdit } = useOpen();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm<IAuthors>();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (author) {
      reset({
        name: author?.name,
        email: author?.email,
        birthday: author?.birthday,
        numberPhone: author?.numberPhone,
      });
    }
  }, [author, reset]);
  const mutation = useMutation({
    mutationFn: async (formDataAuthor) => {
      const { data } = await axios.put(
        `${API}/authors/${author._id}`,
        formDataAuthor,
        {
          withCredentials: true,
        }
      );
      return data;
    },
    onSuccess: (author) => {
      setOpenEdit(false);
      message.success("Cập nhật tác giả thành công");
      queryClient.invalidateQueries({
        queryKey: [QueryKey.AUTHORS],
      });
      queryClient.setQueryData([QueryKey.AUTHORS], (data: IAuthors[]) => {
        return data.map((d) => (d._id == author._id ? d : author));
      });
    },
    onError: (error: IErrorMessage) => {
      const err = error?.response.data as IErrorMessage;
      message.error(err.message || "Lỗi khi cập nhật tác giả!");
    },
  });

  const onSubmit = (data: IAuthors) => {
    mutation.mutate(data as any);
  };

  return (
    <>
      {React.cloneElement(
        children as ReactElement,
        {
          onclick: () => {
            setOpenEdit(true);
          },
        } as { onclick: () => void }
      )}
      <div
        onClick={() => setOpenEdit(false)}
        className={`fixed w-screen h-screen bg-black/50 duration-300 z-20 top-0 left-0 ${
          openEdit ? "opacity-100 visited:" : "opacity-0 invisible"
        }`}
      ></div>

      {openEdit && (
        <section className="fixed top-[15%] left-[35%] w-150 h-125 z-30 shadow border border-gray-300 rounded-2xl bg-white overflow-scroll">
          <div>
            <h2 className="text-center p-2 text-2xl font-bold">
              Cập nhật tác giả
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
                    type="email"
                    {...register("email")}
                    placeholder="Nhập email tác giả..."
                    className="border border-gray-400 rounded-2xl p-1 focus:outline-none w-40"
                  />
                </div>
                <div className="flex flex-col m-2 gap-1">
                  <label htmlFor="" className="ml-2">
                    Ngày sinh(*)
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
                    placeholder="0303030311"
                    className="border border-gray-400 rounded-2xl p-1 focus:outline-none w-40"
                  />
                </div>
              </div>
            </div>
            <div className="shadow-lg rounded-2xl m-2 pb-5 pt-5 flex gap-3">
              <button
                type="button"
                onClick={() => setOpenEdit(false)}
                className="border border-gray-300 p-3 rounded-2xl cursor-pointer hover:bg-gray-100 ml-5"
              >
                Đóng
              </button>
              <button className="bg-blue-500 text-white p-3 rounded-2xl cursor-pointer hover:bg-blue-600">
                Cập nhật tác giả
              </button>
            </div>
          </form>
        </section>
      )}
    </>
  );
};
