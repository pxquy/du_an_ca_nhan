import React, { type ReactElement } from "react";
import type { TGlobalProps } from "../../Types/React";
import { useOpen } from "../../stores/openStore";
import type { IBorrowItems } from "../../Types/borrowItems";

export const DetailBorrowItemModal = ({
  children,
  borrow,
}: TGlobalProps<{ open: boolean; borrow: IBorrowItems }>) => {
  const { openDetail, setOpenDetail } = useOpen();
  return (
    <>
      {React.cloneElement(
        children as ReactElement,
        {
          onClick: () => {
            setOpenDetail(true);
          },
        } as { onClick: () => void }
      )}
      <div
        onClick={() => setOpenDetail(false)}
        className={`w-screen h-screen fixed bg-black/50 z-20 duration-300 top-0 left-0 ${
          openDetail ? "opacity-100 visible" : `opacity-0 invisible`
        }`}
      ></div>
      <section
        className={`fixed left-[50%] z-30 ${
          openDetail ? `opacity-100 top-[50%]` : `opacity-0 top-[-50%]`
        } -translate-[50%] bg-white border duration-300 border-gray-200 w-300 h-155 rounded-2xl`}
      >
        <h2 className="font-bold text-2xl p-4">Chi tiết sách được chọn</h2>
        <div className="flex gap-3">
          <div className="w-[50%]">
            <img
              src={borrow.book_id?.image}
              alt={borrow.book_id.name}
              className="w-full h-125 object-cover rounded-4xl p-5"
            />
          </div>
          <div className="w-[50%] flex flex-col gap-5 mr-5">
            <div>
              <h3 className="font-bold p-2">Thông tin sách</h3>
              <div className="flex flex-col gap-2">
                <p className="pl-10">
                  <span className="text-gray-500">Tên sách:</span>{" "}
                  {borrow.book_id.name}
                </p>
                <p className="pl-10">
                  <span className="text-gray-500">Giá sách:</span>{" "}
                  {borrow.book_id.price}$
                </p>
                <p className="pl-10">
                  <span className="text-gray-500">Mô tả:</span>{" "}
                  {borrow.book_id.description}
                </p>
              </div>
            </div>
            <div>
              <h3 className="font-bold p-2">Thông tin người mượn</h3>
              <div className="flex flex-col gap-2">
                <p className="pl-10">
                  <span className="text-gray-500">Tên người mượn:</span>{" "}
                  {borrow.dateBorrow_id.user_id.name}
                </p>
                <p className="pl-10">
                  <span className="text-gray-500">Email:</span>{" "}
                  {borrow.dateBorrow_id.user_id.email}
                </p>
                <p className="pl-10">
                  <span className="text-gray-500">Số điện thoại:</span>{" "}
                  {borrow.dateBorrow_id.user_id.numberPhone}
                </p>
              </div>
            </div>
            <div>
              <h3 className="font-bold p-2">Thông tin quan trọng</h3>
              <div className="flex flex-col gap-2">
                <p className="pl-10">
                  <span className="text-gray-500">Ngày mượn:</span>{" "}
                  {borrow.dateBorrow_id.borrow_date}
                </p>
                <p className="pl-10">
                  <span className="text-gray-500">Ngày trả:</span>{" "}
                  {borrow.dateBorrow_id.return_date}
                </p>
                <p className="pl-10">
                  <span className="text-gray-500">Số lượn mượn: </span>{" "}
                  {borrow.quantity}
                </p>
                <p className="pl-10">
                  <span className="text-gray-500">Tổng tiền phải trả: </span>{" "}
                  {borrow.totalPrice}$
                </p>
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
    </>
  );
};
