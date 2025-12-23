import { useQueries } from "@tanstack/react-query";
import { API, QueryKey } from "../../../constants/QueryKey";
import { useParams } from "react-router";
import axios from "axios";
import type { IApiResponse, IResponse } from "../../../Types/data";
import type { IBooks } from "../../../Types/books";
import { formatStatus } from "../../../constants/Helper";

const BookDetail = () => {
  const { id } = useParams();
  const result = useQueries({
    queries: [
      {
        queryKey: [QueryKey.BOOKS, id],
        queryFn: async () => {
          const { data } = await axios.get(`${API}/books/${id}`);
          //   console.log("data", data.data?.name);
          return data;
        },
      },
    ],
  });
  const detailBook = result[0].data;
  //   console.log("detailBook: ", detailBook?.data.name);
  return (
    <section>
      <div className="max-w-6xl mx-auto">
        <div className="p-5 font-bold text-2xl">
          <h2>{detailBook?.message}</h2>
        </div>
        <div className="flex gap-5">
          <div>
            <img
              src={detailBook?.data.image}
              alt={detailBook?.data.name}
              className="w-150 h-120 object-cover rounded-2xl"
            />
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <h2 className="text-center font-bold">Thông tin sách</h2>
            <div className="flex flex-col gap-3">
              <p className="font-bold">
                <span className="text-gray-500">Tên sách: </span>
                {detailBook?.data.name}
              </p>
              <div className="flex items-center gap-3">
                <p className="font-bold">
                  <span className="text-gray-500">Giá: </span>
                  {detailBook?.data.price}$
                </p>
                <p className="font-bold text-gray-400 line-through">
                  {detailBook?.data.discountPrice}$
                </p>
              </div>
              <p className="font-bold">
                <span className="text-gray-500">Ngày Xuất bản: </span>
                {detailBook?.data.publish}
              </p>
              <p className="font-bold">
                <span className="text-gray-500">Thể loại: </span>
                {detailBook?.data.category_id.name}
              </p>
              <p className="font-bold">
                <span className="text-gray-500">Tác giả: </span>
                {detailBook?.data.author_id.name}
              </p>
              <p>
                {detailBook?.data.status == "1" ? (
                  <span className="bg-green-500 text-white p-1 rounded-2xl">
                    Trạng thái: {formatStatus(detailBook?.data.status)}
                  </span>
                ) : (
                  <span className="bg-red-500 text-white p-1 rounded-2xl">
                    Trạng thái: {formatStatus(detailBook?.data.status)}
                  </span>
                )}
              </p>
              <div>
                <span className="text-gray-500 font-bold">Mô tả:</span>
                <p>{detailBook?.data.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookDetail;
