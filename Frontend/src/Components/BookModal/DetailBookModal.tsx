import React, { type ReactElement } from "react";
import type { TGlobalProps } from "../../Types/storeType";
import { useOpen } from "../../stores/openStore";
import type { IBooks } from "../../Types/books";
import { formatStatus } from "../../constants/Helper";
import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "../../constants/QueryKey";
import { Api } from "../../Api/api";
import type { IApiResponse, IResponse } from "../../Types/data";
import type { IComments } from "../../Types/comment";

export const DetailBookModal = ({
  children,
  detailBook,
}: TGlobalProps<{ detailBook: IBooks; open: boolean }>) => {
  const { openDetail, openId, setOpenDetail, setOpenId } = useOpen();
  const isOpen = openDetail && openId === detailBook._id;
  const { data: comments } = useQuery({
    queryKey: [QueryKey.COMMENTS, detailBook._id],
    queryFn: async () => {
      const { data } = await Api.get<IApiResponse<IResponse<IComments>>>(
        `comments`
      );
      console.log(data.data.docs.map((c) => c.book_id === detailBook._id));
      return data.data;
    },
    enabled: isOpen,
  });
  return (
    <>
      {React.cloneElement(
        children as ReactElement,
        {
          onClick: () => {
            setOpenDetail(true);
            setOpenId(detailBook._id);
          },
        } as { onClick: () => void }
      )}

      <div
        onClick={() => setOpenDetail(false)}
        className={`fixed w-screen h-screen bg-black/50 duration-300 z-20 top-0 left-0 ${
          isOpen ? "opacity-100 visited:" : "opacity-0 invisible"
        }`}
      ></div>

      {isOpen && (
        <section className="fixed top-[4%] left-[19%] z-30 bg-white w-250 rounded-2xl">
          <div>
            <div className="p-5 font-bold text-2xl">
              <h2>Thông tin chi tiết sách</h2>
            </div>
            <div className="flex gap-5">
              <div>
                <img
                  src={detailBook?.image}
                  alt={detailBook?.name}
                  className="w-150 h-80 object-cover rounded-4xl p-4"
                />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <h2 className="text-center font-bold">Thông tin sách</h2>
                <div className="flex flex-col gap-3">
                  <p className="font-bold">
                    <span className="text-gray-500">Tên sách: </span>
                    {detailBook?.name}
                  </p>
                  <div className="flex items-center gap-3">
                    <p className="font-bold">
                      <span className="text-gray-500">Giá: </span>
                      {detailBook?.price}$
                    </p>
                    <p className="font-bold text-gray-400 line-through">
                      {detailBook?.discountPrice}$
                    </p>
                  </div>
                  <p className="font-bold">
                    <span className="text-gray-500">Ngày Xuất bản: </span>
                    {detailBook?.publish}
                  </p>
                  <p className="font-bold">
                    <span className="text-gray-500">Thể loại: </span>
                    {detailBook?.category_id.name}
                  </p>
                  <p className="font-bold">
                    <span className="text-gray-500">Tác giả: </span>
                    {detailBook?.author_id.name}
                  </p>
                  <p>
                    {detailBook?.status == "1" ? (
                      <span className="bg-green-500 text-white p-1 rounded-2xl">
                        Trạng thái: {formatStatus(detailBook?.status)}
                      </span>
                    ) : (
                      <span className="bg-red-500 text-white p-1 rounded-2xl">
                        Trạng thái: {formatStatus(detailBook?.status)}
                      </span>
                    )}
                  </p>
                  <div>
                    <span className="text-gray-500 font-bold">Mô tả:</span>
                    <p>{detailBook?.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="m-5 h-40 overflow-scroll">
            <h2 className="text-center font-bold">Những bình luận về sách</h2>
            {comments?.docs &&
            comments?.docs.filter((c) => c.book_id === detailBook._id).length >
              0 ? (
              comments.docs
                .filter((c) => c.book_id === detailBook._id)
                .map((c, index) => (
                  <div key={index} className="border border-gray-300 p-2">
                    <p className="font-semibold">
                      Tên người bình luận: {c.user_id.name}
                    </p>
                    <p className="m-2">
                      <span className="font-semibold">Nội dung: </span>{" "}
                      {c.content}
                    </p>
                  </div>
                ))
            ) : (
              <p className="text-center mt-10">Hiện chưa có bình luận nào!</p>
            )}
          </div>
          <div className="text-end mr-5">
            <button
              onClick={() => setOpenDetail(false)}
              className="border border-gray-200 p-3 rounded-2xl w-20 cursor-pointer m-1 font-bold hover:bg-blue-400 hover:text-white"
            >
              đóng
            </button>
          </div>
        </section>
      )}
    </>
  );
};
