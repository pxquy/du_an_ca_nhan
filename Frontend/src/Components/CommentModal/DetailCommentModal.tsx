import React, { type ReactElement } from "react";
import type { TGlobalProps } from "../../Types/storeType";
import { useOpen } from "../../stores/openStore";
import { formatStatus } from "../../constants/Helper";
import type { IComments } from "../../Types/comment";
import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "../../constants/QueryKey";
import { GetByIDBookApi } from "../../services/bookApis";

export const CommentDetailModal = ({
  children,
  comment,
}: TGlobalProps<{ comment: IComments; open: boolean }>) => {
  const { openId, openDetail, setOpenId, setOpenDetail } = useOpen();
  const isOpen = openDetail && openId === comment._id;

  const { data: book } = useQuery({
    queryKey: [QueryKey.BOOKS],
    queryFn: () => GetByIDBookApi(comment?.book_id),
  });
  return (
    <>
      {React.cloneElement(
        children as ReactElement,
        {
          onClick: () => {
            setOpenDetail(true);
            setOpenId(comment._id);
          },
        } as { onClick: () => void }
      )}
      <div
        onClick={() => {
          setOpenId(null), setOpenDetail(false);
        }}
        className={`fixed top-0 left-0 w-screen h-screen bg-black/50 z-20 duration-300 ${
          isOpen ? "opacity-100 visited" : "opacity-0 invisible"
        }`}
      ></div>
      {isOpen && (
        <section className="fixed w-180 bg-white shadow-2xs top-[15%] left-[26%] duration-300 z-30 rounded-2xl">
          <h2 className="p-3 text-2xl font-bold">Chi tiết bình luận</h2>
          <div className="flex justify-between">
            <div className="w-[40%] m-7">
              <h3 className="font-bold pb-3">Thông tin sách</h3>
              <div className="flex flex-col gap-2">
                <p>Tên sách: {book?.name}</p>
                <p>Giá sách: {book?.price}</p>
                <p>Trạng thái: {formatStatus(book?.status || "")}</p>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <p>Hình ảnh:</p>
                <img
                  src={book?.image}
                  alt={book?.name}
                  className="w-30 rounded-2xl"
                />
              </div>
            </div>
            <div className="w-[60%] flex flex-col gap-3 m-7">
              <h3 className="font-bold pb-3">Thông tin người dùng</h3>
              <p className="flex items-center gap-2 font-semibold">
                <span className="text-gray-500">Tên người bình luận:</span>
                {comment?.user_id.name}
              </p>
              <h3 className="font-bold pb-3">Nội dung bình luận</h3>
              <p className="flex items-center gap-2 font-semibold">
                <span className="text-gray-500">Tiêu đề:</span>
                {comment?.title}
              </p>
              <p className="flex items-center gap-1 font-semibold">
                <span className="w-20 text-gray-500">Nội dung:</span>
                {comment?.content}
              </p>
            </div>
          </div>
          <div className="text-end m-3">
            <button
              onClick={() => setOpenDetail(false)}
              className="p-3 border border-gray-200 rounded-2xl cursor-pointer hover:bg-blue-500 hover:text-white hover:font-semibold"
            >
              Đóng
            </button>
          </div>
        </section>
      )}
    </>
  );
};
