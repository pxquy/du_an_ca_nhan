import { message } from "antd";
import { useOpen } from "../../stores/openStore";
import type { IApiResponse, IErrorMessage, IResponse } from "../../Types/data";
import type { IDateBorrows } from "../../Types/dateBorrows";
import type { TGlobalProps } from "../../Types/React";
import { QueryKey } from "../../constants/QueryKey";
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import type { IUsers } from "../../Types/user";
import { Api } from "../../Api/api";
import React, { useEffect, type ReactElement } from "react";

export const AddDateBorrow = ({
  children,
}: TGlobalProps<{ open: boolean }>) => {
  const { openAdd, setOpenAdd } = useOpen();
  const { register, handleSubmit } = useForm<IDateBorrows>();
  const queryClient = useQueryClient();
  const result = useQueries({
    queries: [
      {
        queryKey: [QueryKey.USERS],
        queryFn: async () => {
          const { data } = await Api.get<IApiResponse<IResponse<IUsers>>>(
            `users`
          );
          return data.data;
        },
      },
    ],
  });

  const users = result[0].data;
  const mutation = useMutation({
    mutationFn: async (formDataAuthor) => {
      const { data } = await Api.post<IApiResponse<IResponse<IDateBorrows>>>(
        `dateBorrows`,
        formDataAuthor
      );
      return data;
    },
    onSuccess: (dateBorrow) => {
      setOpenAdd(false);
      message.success("Thêm người mượn mới thành công");
      queryClient.invalidateQueries({
        queryKey: [QueryKey.DATEBORROWS],
      });
      queryClient.setQueryData(
        [QueryKey.DATEBORROWS],
        (data: IDateBorrows[]) => {
          return data && [...data, dateBorrow];
        }
      );
    },
    onError: (error: IErrorMessage) => {
      const err = error?.response.data as IErrorMessage;
      message.error(err.message || "Lỗi khi thêm mới người mượn!");
    },
  });

  const onSubmit = (data: IDateBorrows) => {
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
              Thêm tác giả mới
            </h2>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="shadow-lg rounded-2xl m-2">
              <p className="p-2 text-gray-500 font-bold">Phần tử chính</p>
              <div className="flex flex-col m-2 gap-1">
                <label htmlFor="" className="ml-2">
                  Người mượn(*)
                </label>
                <select
                  id=""
                  {...register("user_id")}
                  className="border border-gray-400 rounded-2xl p-1 focus:outline-none w-40"
                >
                  <option value="" hidden>
                    Chọn người mượn
                  </option>
                  {users?.docs.map((u, index) => (
                    <option key={index} value={u._id}>
                      {u.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col m-2 gap-1">
                  <label htmlFor="" className="ml-2">
                    Ngày mượn(*)
                  </label>
                  <input
                    type="date"
                    {...register("borrow_date")}
                    className="border border-gray-400 rounded-2xl p-1 focus:outline-none w-40"
                  />
                </div>
                <div className="flex flex-col m-2 gap-1">
                  <label htmlFor="" className="ml-2">
                    Ngày phải trả(*)
                  </label>
                  <input
                    type="date"
                    {...register("return_date")}
                    className="border border-gray-400 rounded-2xl p-1 focus:outline-none w-40"
                  />
                </div>
              </div>
            </div>
            <div className="shadow-lg rounded-2xl m-2"></div>
            <div className="shadow-lg rounded-2xl m-2 pb-5 pt-5 flex gap-3">
              <button
                type="button"
                onClick={() => setOpenAdd(false)}
                className="border border-gray-300 p-3 rounded-2xl cursor-pointer hover:bg-gray-100 ml-5"
              >
                Đóng
              </button>
              <button className="bg-blue-500 text-white p-3 rounded-2xl cursor-pointer hover:bg-blue-600">
                Thêm người mượn mới
              </button>
            </div>
          </form>
        </section>
      )}
    </>
  );
};

export const EditDateBorrow = ({
  children,
  dateBorrow,
}: TGlobalProps<{ dateBorrow: IDateBorrows; open: boolean }>) => {
  const { openEdit, setOpenEdit } = useOpen();
  const { register, handleSubmit, reset } = useForm<IDateBorrows>();
  const queryClient = useQueryClient();
  const result = useQueries({
    queries: [
      {
        queryKey: [QueryKey.USERS],
        queryFn: async () => {
          const { data } = await Api.get<IApiResponse<IResponse<IUsers>>>(
            `users`
          );
          return data.data;
        },
      },
    ],
  });

  const users = result[0].data;

  useEffect(() => {
    if (dateBorrow && users) {
      reset({
        user_id: dateBorrow.user_id._id as any,
        borrow_date: dateBorrow.borrow_date,
        return_date: dateBorrow.return_date,
      });
    }
  }, [dateBorrow, users, reset]);
  const mutation = useMutation({
    mutationFn: async (formDataAuthor) => {
      const { data } = await Api.put<IApiResponse<IResponse<IDateBorrows>>>(
        `dateBorrows/${dateBorrow._id}`,
        formDataAuthor
      );
      return data;
    },
    onSuccess: (dateBorrow) => {
      setOpenEdit(false);
      message.success("Cập nhật người mượn thành công");
      queryClient.invalidateQueries({
        queryKey: [QueryKey.DATEBORROWS],
      });
      queryClient.setQueryData(
        [QueryKey.DATEBORROWS],
        (data: IDateBorrows[]) => {
          return data && [...data, dateBorrow];
        }
      );
    },
    onError: (error: IErrorMessage) => {
      const err = error?.response.data as IErrorMessage;
      message.error(err.message || "Lỗi khi cập nhật người mượn!");
    },
  });

  const onSubmit = (data: IDateBorrows) => {
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
        <section className="fixed top-[15%] left-[31%] w-150 h-125 shadow border border-gray-300 z-30 rounded-2xl bg-white overflow-scroll">
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
                  Người mượn(*)
                </label>
                <select
                  id=""
                  {...register("user_id")}
                  className="border border-gray-400 rounded-2xl p-1 focus:outline-none w-40"
                >
                  <option value="" hidden>
                    Chọn người mượn
                  </option>
                  {users?.docs.map((u, index) => (
                    <option key={index} value={u._id}>
                      {u.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col m-2 gap-1">
                  <label htmlFor="" className="ml-2">
                    Ngày mượn(*)
                  </label>
                  <input
                    type="date"
                    {...register("borrow_date")}
                    className="border border-gray-400 rounded-2xl p-1 focus:outline-none w-40"
                  />
                </div>
                <div className="flex flex-col m-2 gap-1">
                  <label htmlFor="" className="ml-2">
                    Ngày phải trả(*)
                  </label>
                  <input
                    type="date"
                    {...register("return_date")}
                    className="border border-gray-400 rounded-2xl p-1 focus:outline-none w-40"
                  />
                </div>
              </div>
            </div>
            <div className="shadow-lg rounded-2xl m-2"></div>
            <div className="shadow-lg rounded-2xl m-2 pb-5 pt-5 flex gap-3">
              <button
                type="button"
                onClick={() => setOpenEdit(false)}
                className="border border-gray-300 p-3 rounded-2xl cursor-pointer hover:bg-gray-100 ml-5"
              >
                Đóng
              </button>
              <button className="bg-blue-500 text-white p-3 rounded-2xl cursor-pointer hover:bg-blue-600">
                Cập nhật người mượn
              </button>
            </div>
          </form>
        </section>
      )}
    </>
  );
};
