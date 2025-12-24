import React, { useEffect, type ReactElement } from "react";
import type { TGlobalProps } from "../../Types/React";
import { useOpen } from "../../stores/openStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import type { ICategories } from "../../Types/categories";
import type { IApiResponse, IErrorMessage, IResponse } from "../../Types/data";
import axios from "axios";
import { API, QueryKey } from "../../constants/QueryKey";
import { message } from "antd";

export const AddCategoryModel = ({
  children,
}: TGlobalProps<{ open: boolean }>) => {
  const { openAdd, setOpenAdd } = useOpen();
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm<ICategories>();
  const mutation = useMutation({
    mutationFn: async (formDataCategory) => {
      const { data } = await axios.post<IApiResponse<IResponse<ICategories>>>(
        `${API}/categories`,
        formDataCategory,
        {
          withCredentials: true,
        }
      );
      return data;
    },
    onSuccess: (category) => {
      setOpenAdd(false);
      message.success("Thêm danh mục mới thành công!");
      queryClient.invalidateQueries({
        queryKey: [QueryKey.CATEGORIES],
      });
      queryClient.setQueryData([QueryKey.CATEGORIES], (data: ICategories[]) => {
        return data && [...data, category];
      });

      reset({});
    },
    onError: (error: IErrorMessage) => {
      const err = error?.response.data as IErrorMessage;
      message.error(err.message || "Lỗi khi thêm danh mục!");
    },
  });

  const onSubmit = (data: ICategories) => {
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
        <section className="fixed top-[15%] left-[31%] w-150 h-125 shadow border border-gray-300 z-30 rounded-2xl bg-white overflow-scroll">
          <div>
            <h2 className="text-center p-2 text-2xl font-bold">
              Thêm danh mục mới
            </h2>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="shadow-lg rounded-2xl m-2">
              <p className="p-2 text-gray-500 font-bold">Phần tử chính</p>
              <div className="flex flex-col m-2 gap-1">
                <label htmlFor="" className="ml-2">
                  Tên danh mục(*)
                </label>
                <input
                  type="text"
                  {...register("name")}
                  placeholder="Nhập tên danh mục..."
                  className="border border-gray-400 rounded-2xl p-1 focus:outline-none mt-2 mb-2"
                />
              </div>
            </div>
            <div className="shadow-lg rounded-2xl flex flex-col m-2 gap-1">
              <label htmlFor="" className="ml-2">
                Mô tả
              </label>
              <textarea
                {...register("description")}
                id=""
                rows={4}
                className="border border-gray-200 focus:outline-none rounded-2xl"
              ></textarea>
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
                Thêm mới danh mục
              </button>
            </div>
          </form>
        </section>
      )}
    </>
  );
};

// Edit category
export const EditCategoryModel = ({
  children,
  category,
}: TGlobalProps<{ category: ICategories; open: boolean }>) => {
  const { openEdit, setOpenEdit } = useOpen();
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm<ICategories>();

  console.log(category);

  useEffect(() => {
    if (category) {
      reset({
        name: category.name,
        description: category.description,
      });
    }
  }, [category, reset]);
  const mutation = useMutation({
    mutationFn: async (formDataCategory) => {
      const { data } = await axios.put(
        `${API}/categories/${category._id}`,
        formDataCategory,
        {
          withCredentials: true,
        }
      );
      return data;
    },
    onSuccess: (category) => {
      setOpenEdit(false);
      message.success("Cập nhật danh mục thành công!");
      queryClient.invalidateQueries({
        queryKey: [QueryKey.CATEGORIES],
      });
      queryClient.setQueryData([QueryKey.CATEGORIES], (data: ICategories[]) => {
        return data?.map((d) => (d._id == category._id ? d : category));
      });
    },
    onError: (error: IErrorMessage) => {
      const err = error?.response.data as IErrorMessage;
      message.error(err.error || "Lỗi khi cập nhật danh mục!");
    },
  });

  const onSubmit = (data: ICategories) => {
    mutation.mutate(data as any);
  };
  return (
    <>
      {React.cloneElement(
        children as ReactElement,
        {
          onclick: () => {},
        } as { onclick: () => void }
      )}

      <div
        onClick={() => setOpenEdit(false)}
        className={`fixed w-screen h-screen bg-black/50 duration-300 z-20 top-0 left-0 ${
          openEdit ? "opacity-100 visited:" : "opacity-0 invisible"
        }`}
      ></div>

      {openEdit && (
        <section className="fixed top-[15%] left-[31%] w-150 h-125 shadow border border-gray-300 z-30 rounded-2xl bg-white overflow-scroll">
          <div>
            <h2 className="text-center p-2 text-2xl font-bold">
              Cập nhật danh mục
            </h2>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="shadow-lg rounded-2xl m-2">
              <p className="p-2 text-gray-500 font-bold">Phần tử chính</p>
              <div className="flex flex-col m-2 gap-1">
                <label htmlFor="" className="ml-2">
                  Tên danh mục(*)
                </label>
                <input
                  type="text"
                  {...register("name")}
                  placeholder="Nhập tên danh mục..."
                  className="border border-gray-400 rounded-2xl p-1 focus:outline-none mt-2 mb-2"
                />
              </div>
            </div>
            <div className="shadow-lg rounded-2xl flex flex-col m-2 gap-1">
              <label htmlFor="" className="ml-2">
                Mô tả
              </label>
              <textarea
                {...register("description")}
                id=""
                rows={4}
                className="border border-gray-200 focus:outline-none rounded-2xl"
              ></textarea>
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
                Cập nhật danh mục
              </button>
            </div>
          </form>
        </section>
      )}
    </>
  );
};
