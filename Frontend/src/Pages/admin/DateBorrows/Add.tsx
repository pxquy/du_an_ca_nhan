import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router";
import type { IAuthors } from "../../../Types/authors";
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import { QueryKey } from "../../../constants/QueryKey";
import type {
  IApiResponse,
  IErrorMessage,
  IResponse,
} from "../../../Types/data";
import { message } from "antd";
import type { IDateBorrows } from "../../../Types/dateBorrows";
import type { IUsers } from "../../../Types/user";
import { Api } from "../../../Api/api";

const AddDateBorrow = () => {
  const navigate = useNavigate();
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
      navigate("/admin/dateBorrows");
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
              onClick={() => navigate("/admin/dateBorrows")}
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
    </>
  );
};

export default AddDateBorrow;
