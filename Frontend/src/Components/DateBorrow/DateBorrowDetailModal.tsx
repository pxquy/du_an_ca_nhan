import React, { type ReactElement } from "react";
import { useOpen } from "../../stores/openStore";
import type { TGlobalProps } from "../../Types/storeType";
import type { IDateBorrows } from "../../Types/dateBorrows";

export const DateBorrowDetailModal = ({
  children,
  dateBorrow,
}: TGlobalProps<{ dateBorrow: IDateBorrows; open: boolean }>) => {
  const { openId, openDetail, setOpenId, setOpenDetail } = useOpen();
  const isOpen = openDetail && openId === dateBorrow._id;
  return (
    <>
      {React.cloneElement(
        children as ReactElement,
        {
          onClick: () => {
            setOpenDetail(true), setOpenId(dateBorrow._id);
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
        <section className="fixed w-180 h-120 bg-white shadow-2xs top-[15%] left-[26%] duration-300 z-30 rounded-2xl">
          <div>
            <h2 className="font-semibold p-2 pt-4 text-3xl">
              Chi tiết người mượn sách
            </h2>
            <div className="p-5 ml-5">
              <div className="shadow-2xs border border-gray-200 rounded-2xl">
                <h2 className="font-semibold p-2">Thông tin người mượn</h2>
                <div className="pl-3 flex items-center justify-around">
                  <div className="m-4">
                    <img
                      className="w-30 h-30 object-cover rounded-full"
                      src={dateBorrow.user_id?.image}
                      alt={dateBorrow.user_id?.name}
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <p>
                      <span>Tên người mượn: </span> {dateBorrow.user_id?.name}
                    </p>
                    <p>
                      <span>Email: </span> {dateBorrow.user_id?.email}
                    </p>
                    <p>
                      <span>Số điện thoại: </span>
                      {dateBorrow.user_id?.numberPhone}
                    </p>
                    <p>
                      <span>Địa chỉ: </span>
                      {dateBorrow.user_id?.address}
                    </p>
                  </div>
                </div>
              </div>
              <div className="shadow-2xs border border-gray-200 rounded-2xl mt-5">
                <h2 className="font-semibold p-2">
                  Thông tin ngày mượn và trả
                </h2>
                <div className="pl-3 pb-4">
                  <p>
                    <span>Ngày mượn: </span>
                    {dateBorrow.borrow_date}
                  </p>
                  <p>
                    <span>Ngày phải trả: </span>
                    {dateBorrow.return_date}
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
            </div>
          </div>
        </section>
      )}
    </>
  );
};
