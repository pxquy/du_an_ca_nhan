import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import type { TGlobalProps } from "../../Types/React";
import { useForm } from "react-hook-form";
import type { IBorrowItems } from "../../Types/borrowItems";
import { QueryKey } from "../../constants/QueryKey";
import type { IApiResponse, IErrorMessage, IResponse } from "../../Types/data";
import type { IBooks } from "../../Types/books";
import type { IDateBorrows } from "../../Types/dateBorrows";
import { message } from "antd";
import { useOpen } from "../../stores/openStore";
import React, { useEffect, type ReactElement } from "react";
import { Api } from "../../Api/api";
import {
  validateBorrowItems,
  type BorrowItemsValidate,
} from "../../libs/validations/validateBorrowItems";
import { zodResolver } from "@hookform/resolvers/zod";

export const AddBorrowItem = ({
  children,
}: TGlobalProps<{ open: boolean }>) => {
  const { openAdd, setOpenAdd } = useOpen();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BorrowItemsValidate>({
    resolver: zodResolver(validateBorrowItems),
  });
  const queryClient = useQueryClient();
  const result = useQueries({
    queries: [
      {
        queryKey: [QueryKey.BOOKS],
        queryFn: async () => {
          const { data } = await Api.get<IApiResponse<IResponse<IBooks>>>(
            `books`
          );
          return data.data;
        },
      },
      {
        queryKey: [QueryKey.DATE_BORROWS],
        queryFn: async () => {
          const { data } = await Api.get<IApiResponse<IResponse<IDateBorrows>>>(
            `dateBorrows`
          );
          return data.data;
        },
      },
    ],
  });

  const books = result[0].data;
  const dateBorrows = result[1]?.data;
  const isLoading = result.some((r) => r.isLoading);
  const mutation = useMutation({
    mutationFn: async (formDataAuthor) => {
      const { data } = await Api.post<IApiResponse<IResponse<IBorrowItems>>>(
        `borrowItems`,
        formDataAuthor
      );
      return data;
    },
    onSuccess: (borrowItem) => {
      setOpenAdd(false);
      message.success("Thêm sách mượn mới thành công");
      queryClient.invalidateQueries({
        queryKey: [QueryKey.BORROW_ITEMS],
      });
      queryClient.setQueryData(
        [QueryKey.BORROW_ITEMS],
        (data: IBorrowItems[]) => {
          return data && [...data, borrowItem];
        }
      );
      reset({});
    },
    onError: (error: IErrorMessage) => {
      const err = error?.response.data as IErrorMessage;
      message.error(err.message || "Lỗi khi thêm sách mượn mới!");
    },
  });

  const onSubmit = (data: BorrowItemsValidate) => {
    mutation.mutate(data as any);
  };
  return (
    <>
      {React.cloneElement(
        children as ReactElement,
        {
          onClick: () => {
            setOpenAdd(true);
          },
        } as { onClick: () => void }
      )}

      <div
        onClick={() => setOpenAdd(false)}
        className={`fixed w-screen h-screen bg-black/50 duration-300 z-20 top-0 left-0 ${
          openAdd ? "opacity-100 visited:" : "opacity-0 invisible"
        }`}
      ></div>

      {openAdd && (
        <>
          {isLoading ? <span>Đang tải dữ liệu...</span> : ""}
          <section className="fixed top-[15%] left-[35%] w-150 h-125 shadow border border-gray-300 rounded-2xl bg-white overflow-scroll z-30">
            <div>
              <h2 className="text-center p-2 text-2xl font-bold">
                Thêm sách mượn mới
              </h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="shadow-lg rounded-2xl m-2">
                <p className="p-2 text-gray-500 font-bold">Phần tử chính</p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col m-2 gap-1">
                    <label htmlFor="" className="ml-2">
                      Sách mượn mới(*)
                    </label>
                    <select
                      id=""
                      {...register("book_id")}
                      className="border border-gray-400 rounded-2xl p-1 focus:outline-none w-40"
                    >
                      <option value="" hidden>
                        Chọn sách
                      </option>
                      {books?.docs.map((b, index) => (
                        <option key={index} value={b._id}>
                          {b.name}
                        </option>
                      ))}
                    </select>
                    {errors.book_id && (
                      <p className="w-45 text-red-500 font-semibold text-[14px] p-[2px] pl-2">
                        {errors?.book_id.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col m-2 gap-1">
                    <label htmlFor="" className="ml-2">
                      Thông tin người mượn(*)
                    </label>
                    <select
                      id=""
                      {...register("dateBorrow_id")}
                      className="border border-gray-400 rounded-2xl p-1 focus:outline-none w-40"
                    >
                      <option value="" hidden>
                        Chọn người mượn sách
                      </option>
                      {dateBorrows?.docs.map((d, index) => (
                        <option key={index} value={d._id}>
                          {d.user_id?.name}
                        </option>
                      ))}
                    </select>
                    {errors.dateBorrow_id && (
                      <p className="w-45 text-red-500 font-semibold text-[14px] p-[2px] pl-2">
                        {errors?.dateBorrow_id.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="shadow-lg rounded-2xl m-2">
                <p className="p-2 text-gray-500 font-bold">Phần tử liên quan</p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col m-2 gap-1">
                    <label htmlFor="" className="ml-2">
                      Số lượng
                    </label>
                    <input
                      type="number"
                      {...register("quantity", { valueAsNumber: true })}
                      placeholder="1"
                      className="border border-gray-400 rounded-2xl p-1 focus:outline-none w-40"
                    />
                    {errors.quantity && (
                      <p className="w-45 text-red-500 font-semibold text-[14px] p-[2px] pl-2">
                        {errors?.quantity.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col m-2 gap-1">
                    <label htmlFor="" className="ml-2">
                      Trạng thái
                    </label>
                    <select
                      id=""
                      {...register("status")}
                      className="border border-gray-400 rounded-2xl p-1 focus:outline-none w-40"
                    >
                      <option value="" hidden>
                        Chọn trạng thái
                      </option>
                      <option value="1">Đang mượn</option>
                      <option value="2">Đã trả</option>
                      <option value="3">Trễ hạn</option>
                    </select>
                    {errors.status && (
                      <p className="w-45 text-red-500 font-semibold text-[14px] p-[2px] pl-2">
                        {errors?.status.message}
                      </p>
                    )}
                  </div>
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
                  className="p-1 border border-gray-200 focus:outline-none rounded-2xl"
                ></textarea>
                {errors.description && (
                  <p className="w-45 text-red-500 font-semibold text-[14px] p-[2px] pl-2">
                    {errors?.description.message}
                  </p>
                )}
              </div>
              <div className="shadow-lg rounded-2xl m-2 pb-5 pt-5 flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    reset({}), setOpenAdd(false);
                  }}
                  className="border border-gray-300 p-3 rounded-2xl cursor-pointer hover:bg-gray-100 ml-5"
                >
                  Đóng
                </button>
                <button className="bg-blue-500 text-white p-3 rounded-2xl cursor-pointer hover:bg-blue-600">
                  Thêm sách mượn mới
                </button>
              </div>
            </form>
          </section>
        </>
      )}
    </>
  );
};

export const EditBorrowItem = ({
  children,
  borrowItem,
}: TGlobalProps<{ open: boolean; borrowItem: IBorrowItems }>) => {
  const { openId, openEdit, setOpenId, setOpenEdit } = useOpen();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BorrowItemsValidate>({
    resolver: zodResolver(validateBorrowItems),
  });
  const queryClient = useQueryClient();
  const result = useQueries({
    queries: [
      {
        queryKey: [QueryKey.BOOKS],
        queryFn: async () => {
          const { data } = await Api.get<IApiResponse<IResponse<IBooks>>>(
            `books`
          );
          return data.data;
        },
      },
      {
        queryKey: [QueryKey.DATE_BORROWS],
        queryFn: async () => {
          const { data } = await Api.get<IApiResponse<IResponse<IDateBorrows>>>(
            `dateBorrows`
          );
          return data.data;
        },
      },
    ],
  });

  const books = result[0].data;
  const dateBorrows = result[1].data;
  const isLoading = result.some((r) => r.isLoading);
  const isOpen = openEdit && openId === borrowItem._id;

  useEffect(() => {
    if (borrowItem && books && dateBorrows) {
      reset({
        book_id: borrowItem.book_id?._id as any,
        dateBorrow_id: borrowItem.dateBorrow_id?._id as any,
        quantity: borrowItem.quantity,
        description: borrowItem.description,
        status: borrowItem.status,
      });
    }
  }, [dateBorrows, borrowItem, books, reset]);
  const mutation = useMutation({
    mutationFn: async (formDataAuthor) => {
      const { data } = await Api.put(
        `borrowItems/${borrowItem._id}`,
        formDataAuthor,
        {
          withCredentials: true,
        }
      );
      return data;
    },
    onSuccess: (borrowItem) => {
      setOpenEdit(false);
      message.success("Cập nhật sách mượn thành công");
      queryClient.invalidateQueries({
        queryKey: [QueryKey.BORROW_ITEMS],
      });
      queryClient.setQueryData(
        [QueryKey.BORROW_ITEMS],
        (data: IBorrowItems[]) => {
          return data.map((d) => (d._id == borrowItem._id ? d : borrowItem));
        }
      );
    },
    onError: (error: IErrorMessage) => {
      const err = error?.response.data as IErrorMessage;
      message.error(err.message || "Lỗi khi cập nhật sách mượn!");
    },
  });

  const onSubmit = (data: BorrowItemsValidate) => {
    mutation.mutate(data as any);
  };
  return (
    <>
      {React.cloneElement(
        children as ReactElement,
        {
          onClick: () => {
            setOpenEdit(true);
            setOpenId(borrowItem._id);
          },
        } as { onClick: () => void }
      )}

      <div
        onClick={() => {
          setOpenId(null), setOpenEdit(false);
        }}
        className={`fixed w-screen h-screen bg-black/50 duration-300 z-20 top-0 left-0 ${
          isOpen ? "opacity-100 visited:" : "opacity-0 invisible"
        }`}
      ></div>
      {isOpen && (
        <>
          {isLoading ? <span>Đang tải dữ liệu...</span> : ""}
          <section className="fixed top-[15%] left-[35%] w-150 h-125 shadow border border-gray-300 rounded-2xl bg-white overflow-scroll z-30">
            <div>
              <h2 className="text-center p-2 text-2xl font-bold">
                Cập nhật sách mượn
              </h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="shadow-lg rounded-2xl m-2">
                <p className="p-2 text-gray-500 font-bold">Phần tử chính</p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col m-2 gap-1">
                    <label htmlFor="" className="ml-2">
                      Sách mượn mới(*)
                    </label>
                    <select
                      id=""
                      {...register("book_id")}
                      className="border border-gray-400 rounded-2xl p-1 focus:outline-none w-40"
                    >
                      <option value="" hidden>
                        Chọn sách
                      </option>
                      {books?.docs.map((b, index) => (
                        <option key={index} value={b._id}>
                          {b.name}
                        </option>
                      ))}
                    </select>
                    {errors.book_id && (
                      <p className="w-45 text-red-500 font-semibold text-[14px] p-[2px] pl-2">
                        {errors?.book_id.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col m-2 gap-1">
                    <label htmlFor="" className="ml-2">
                      Thông tin người mượn(*)
                    </label>
                    <select
                      id=""
                      {...register("dateBorrow_id")}
                      className="border border-gray-400 rounded-2xl p-1 focus:outline-none w-40"
                    >
                      <option value="" hidden>
                        Chọn người mượn sách
                      </option>
                      {dateBorrows?.docs.map((d, index) => (
                        <option key={index} value={d._id}>
                          {d.user_id?.name}
                        </option>
                      ))}
                    </select>
                    {errors.dateBorrow_id && (
                      <p className="w-45 text-red-500 font-semibold text-[14px] p-[2px] pl-2">
                        {errors?.dateBorrow_id.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="shadow-lg rounded-2xl m-2">
                <p className="p-2 text-gray-500 font-bold">Phần tử liên quan</p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col m-2 gap-1">
                    <label htmlFor="" className="ml-2">
                      Số lượng
                    </label>
                    <input
                      type="number"
                      {...register("quantity", { valueAsNumber: true })}
                      placeholder="1"
                      className="border border-gray-400 rounded-2xl p-1 focus:outline-none w-40"
                    />
                    {errors.quantity && (
                      <p className="w-45 text-red-500 font-semibold text-[14px] p-[2px] pl-2">
                        {errors?.quantity.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col m-2 gap-1">
                    <label htmlFor="" className="ml-2">
                      Trạng thái
                    </label>
                    <select
                      id=""
                      {...register("status")}
                      className="border border-gray-400 rounded-2xl p-1 focus:outline-none w-40"
                    >
                      <option value="" hidden>
                        Chọn trạng thái
                      </option>
                      <option value="1">Đang mượn</option>
                      <option value="2">Đã trả</option>
                      <option value="3">Trễ hạn</option>
                    </select>
                    {errors.status && (
                      <p className="w-45 text-red-500 font-semibold text-[14px] p-[2px] pl-2">
                        {errors?.status.message}
                      </p>
                    )}
                  </div>
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
                  className="p-1 border border-gray-200 focus:outline-none rounded-2xl"
                ></textarea>
                {errors.description && (
                  <p className="w-45 text-red-500 font-semibold text-[14px] p-[2px] pl-2">
                    {errors?.description.message}
                  </p>
                )}
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
                  Cập nhật sách mượn
                </button>
              </div>
            </form>
          </section>
        </>
      )}
    </>
  );
};
