import React, { type ReactElement } from "react";
import type { TGlobalProps } from "../../Types/React";
import { useOpen } from "../../stores/openStore";
import type { IBooks } from "../../Types/books";
import { formatStatus } from "../../constants/Helper";

export const DetailBookModal = ({
  children,
  detailBook,
}: TGlobalProps<{ detailBook: IBooks; open: boolean }>) => {
  const { openDetail, setOpenDetail } = useOpen();
  return (
    <>
      {React.cloneElement(
        children as ReactElement,
        {
          onclick: () => {
            setOpenDetail(true);
          },
        } as { onclick: () => void }
      )}

      <div
        onClick={() => setOpenDetail(false)}
        className={`fixed w-screen h-screen bg-black/50 duration-300 z-20 top-0 left-0 ${
          openDetail ? "opacity-100 visited:" : "opacity-0 invisible"
        }`}
      ></div>

      {openDetail && (
        <section className="fixed top-[7%] left-[19%] z-30 bg-white w-250 h-155">
          <div>
            <div className="p-5 font-bold text-2xl">
              <h2>Thông tin chi tiết sách</h2>
            </div>
            <div className="flex gap-5">
              <div>
                <img
                  src={detailBook?.image}
                  alt={detailBook?.name}
                  className="w-150 h-120 object-cover rounded-4xl p-4"
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
