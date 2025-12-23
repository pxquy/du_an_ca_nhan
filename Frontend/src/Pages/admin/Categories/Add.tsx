import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router";
import type { ICategories } from "../../../Types/categories";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API, QueryKey } from "../../../constants/QueryKey";
import { message } from "antd";
import type {
  IApiResponse,
  IResponse,
  IErrorMessage,
} from "../../../Types/data";

const AddCategory = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm<ICategories>();
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
      navigate("/admin/categories");
      message.success("Thêm danh mục mới thành công!");
      queryClient.invalidateQueries({
        queryKey: [QueryKey.CATEGORIES],
      });
      queryClient.setQueryData([QueryKey.CATEGORIES], (data: ICategories[]) => {
        return data && [...data, category];
      });
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
      <section className="w-150 h-125 shadow border border-gray-300 rounded-2xl bg-white overflow-scroll">
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
              onClick={() => navigate("/admin/categories")}
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
    </>
  );
};

export default AddCategory;
