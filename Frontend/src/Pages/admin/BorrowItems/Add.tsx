import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router";
import type { IAuthors } from "../../../Types/authors";
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import { API, QueryKey } from "../../../constants/QueryKey";
import type {
  IApiResponse,
  IErrorMessage,
  IResponse,
} from "../../../Types/data";
import { message } from "antd";
import type { IBorrowItems } from "../../../Types/borrowItems";
import type { IBooks } from "../../../Types/books";
import type { IDateBorrows } from "../../../Types/dateBorrows";

const AddBorrowItem = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<IBorrowItems>();
  const queryClient = useQueryClient();
  const result = useQueries({
    queries: [
      {
        queryKey: [QueryKey.BOOKS],
        queryFn: async () => {
          const { data } = await axios.get<IApiResponse<IResponse<IBooks>>>(
            `${API}/books`
          );
          return data.data;
        },
      },
      {
        queryKey: [QueryKey.DATEBORROWS],
        queryFn: async () => {
          const { data } = await axios.get<
            IApiResponse<IResponse<IDateBorrows>>
          >(`${API}/dateBorrows`);
          return data.data;
        },
      },
    ],
  });

  const books = result[0].data;
  const dateBorrows = result[1].data;
  const isLoading = result.some((r) => r.isLoading);
  const mutation = useMutation({
    mutationFn: async (formDataAuthor) => {
      const { data } = await axios.post<IApiResponse<IResponse<IBorrowItems>>>(
        `${API}/borrowItems`,
        formDataAuthor,
        {
          withCredentials: true,
        }
      );
      return data;
    },
    onSuccess: (borrowItem) => {
      navigate("/admin/borrowItems");
      message.success("Thêm sách mượn mới thành công");
      queryClient.invalidateQueries({
        queryKey: [QueryKey.BORROWITEMS],
      });
      queryClient.setQueryData(
        [QueryKey.BORROWITEMS],
        (data: IBorrowItems[]) => {
          return data && [...data, borrowItem];
        }
      );
    },
    onError: (error: IErrorMessage) => {
      const err = error?.response.data as IErrorMessage;
      message.error(err.message || "Lỗi khi thêm sách mượn mới!");
    },
  });

  const onSubmit = (data: IBorrowItems) => {
    mutation.mutate(data as any);
  };

  return (
    <>
      {isLoading ? <span>Đang tải dữ liệu...</span> : ""}
      <section className="w-150 h-125 shadow border border-gray-300 rounded-2xl bg-white overflow-scroll">
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
                    Chọn tác giả sách
                  </option>
                  {dateBorrows?.docs.map((d, index) => (
                    <option key={index} value={d._id}>
                      {d.user_id?.name}
                    </option>
                  ))}
                </select>
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
                  {...register("quantity")}
                  placeholder="1"
                  className="border border-gray-400 rounded-2xl p-1 focus:outline-none w-40"
                />
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
              className="border border-gray-200 focus:outline-none rounded-2xl"
            ></textarea>
          </div>
          <div className="shadow-lg rounded-2xl m-2 pb-5 pt-5 flex gap-3">
            <button
              type="button"
              onClick={() => navigate("/admin/borrowItems")}
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
  );
};

export default AddBorrowItem;
