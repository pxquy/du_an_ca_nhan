import { useForm } from "react-hook-form";
import type { IBooks } from "../../../Types/books";
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import { API, QueryKey } from "../../../constants/QueryKey";
import axios from "axios";
import type {
  IApiResponse,
  IErrorMessage,
  IResponse,
} from "../../../Types/data";
import type { ICategories } from "../../../Types/categories";
import type { IAuthors } from "../../../Types/authors";
import { useNavigate } from "react-router";
import { useState } from "react";
import { message } from "antd";

const AddPage = () => {
  const navigate = useNavigate();
  const [loadingImage, setLoadingImage] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const [image, setImage] = useState();
  const { register, handleSubmit, reset } = useForm<IBooks>();
  const result = useQueries({
    queries: [
      {
        queryKey: [QueryKey.CATEGORIES],
        queryFn: async () => {
          const res = await axios.get<IApiResponse<IResponse<ICategories>>>(
            `${API}/categories`
          );
          return res.data.data;
        },
      },
      {
        queryKey: [QueryKey.AUTHORS],
        queryFn: async () => {
          const res = await axios.get<IApiResponse<IResponse<IAuthors>>>(
            `${API}/authors`
          );
          return res.data.data;
        },
      },
    ],
  });

  const categories = result[0].data;
  const authors = result[1].data;
  const isLoading = result.some((r) => r.isLoading);

  const mutation = useMutation({
    mutationFn: async (formDataBook) => {
      const { data } = await axios.post<IApiResponse<IResponse<IBooks>>>(
        `${API}/books`,
        formDataBook,
        {
          withCredentials: true,
        }
      );
      return data;
    },
    onSuccess: (book) => {
      navigate("/admin/books");
      message.success("Thêm mới sách thành công");
      queryClient.setQueryData([QueryKey.BOOKS], (data: IBooks[]) => {
        return data && [...data, book];
      });
    },
    onError: (error: IErrorMessage) => {
      const err = error.response?.data as IErrorMessage;
      message.error(err.message || "Lỗi khi thêm sách");
    },
  });

  const onSubmit = (data: IBooks) => {
    console.log(data);
    mutation.mutate(data as any);
  };

  const updateImage = async (files: FileList) => {
    setLoadingImage(true);
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "Image_libery");

    try {
      const { data } = await axios.post(
        "https://api.cloudinary.com/v1_1/djnwxedym/image/upload",
        formData
      );
      reset({
        image: data.url,
      });
      // console.log(data)
      setImage(data.url);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <span>{isLoading}</span>
      <section className="w-150 h-125 shadow border border-gray-300 rounded-2xl bg-white overflow-scroll">
        <div>
          <h2 className="text-center p-2 text-2xl font-bold">Thêm sách mới</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="shadow-lg rounded-2xl m-2">
            <p className="p-2 text-gray-500 font-bold">Phần tử chính</p>
            <div className="flex flex-col m-2 gap-1">
              <label htmlFor="" className="ml-2">
                Tên sách(*)
              </label>
              <input
                type="text"
                {...register("name")}
                placeholder="Nhập tên sách..."
                className="border border-gray-400 rounded-2xl p-1 focus:outline-none"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-col m-2 gap-1">
                <label htmlFor="" className="ml-2">
                  Giá tiền(*)
                </label>
                <input
                  type="number"
                  {...register("price")}
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
                  {...register("publish")}
                  className="border border-gray-400 rounded-2xl p-1 focus:outline-none w-40"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-col m-2 gap-1">
                <label htmlFor="" className="ml-2">
                  Thể loại sách(*)
                </label>
                <select
                  id=""
                  {...register("category_id")}
                  className="border border-gray-400 rounded-2xl p-1 focus:outline-none w-40"
                >
                  <option value="" hidden>
                    Chọn loại sách
                  </option>
                  {categories?.docs.map((c, index) => (
                    <option key={index} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col m-2 gap-1">
                <label htmlFor="" className="ml-2">
                  Tác giả sách(*)
                </label>
                <select
                  id=""
                  {...register("author_id")}
                  className="border border-gray-400 rounded-2xl p-1 focus:outline-none w-40"
                >
                  <option value="" hidden>
                    Chọn tác giả sách
                  </option>
                  {authors?.docs.map((c, index) => (
                    <option key={index} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="shadow-lg rounded-2xl m-2">
            <p className="p-2 text-gray-500 font-bold">Phần tử liên quan</p>
            <div className="flex flex-col m-2 gap-1">
              <label htmlFor="" className="ml-2">
                Hình ảnh sách(*)
              </label>
              <input
                type="file"
                className="border border-gray-400 rounded-2xl p-1 focus:outline-none w-40 cursor-pointer"
                onChange={(e) => {
                  if (e.target.files) {
                    updateImage(e.target.files);
                  }
                }}
              />
              {loadingImage ? <span>Đang tải ảnh...</span> : ""}
              {image != "" && (
                <img
                  src={image}
                  onLoad={() => setLoadingImage(false)}
                  width={120}
                />
              )}
              <input type="hidden" {...register("image")} />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-col m-2 gap-1">
                <label htmlFor="" className="ml-2">
                  Giá giảm
                </label>
                <input
                  type="number"
                  {...register("discountPrice")}
                  placeholder="1000"
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
                  <option value="1">Còn sách</option>
                  <option value="2">Hết sách</option>
                </select>
              </div>
            </div>
          </div>
          <div className="shadow-lg rounded-2xl flex flex-col m-2 gap-1">
            <label htmlFor="" className="ml-2">
              Mô tả
            </label>
            <textarea
              name=""
              id=""
              rows={4}
              className="border border-gray-200 focus:outline-none rounded-2xl"
            ></textarea>
          </div>
          <div className="shadow-lg rounded-2xl m-2 pb-5 pt-5 flex gap-3">
            <button
              type="button"
              onClick={() => navigate("/admin/books")}
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

export default AddPage;
