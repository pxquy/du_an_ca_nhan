import React, { type ReactElement } from "react";
import type { TGlobalProps } from "../../Types/storeType";
import { useOpen } from "../../stores/openStore";
import type { IUsers } from "../../Types/user";
import { formatGender, formatStatusUser } from "../../constants/Helper";

export const DetailUserModal = ({
  children,
  user,
}: TGlobalProps<{ user: IUsers; open: boolean }>) => {
  const { openId, openDetail, setOpenId, setOpenDetail } = useOpen();
  const isOpen = openDetail && openId === user._id;
  return (
    <>
      {React.cloneElement(
        children as ReactElement,
        {
          onClick: () => {
            setOpenDetail(true);
            setOpenId(user._id);
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
          <h2 className="p-3 text-2xl font-bold">
            Chi tiết tài khoản người dùng
          </h2>
          <div className="flex items-center justify-between">
            <div className="w-[60%] m-7">
              <img
                src={user?.image != "" ? user?.image : "/avt.jpg"}
                alt={user.name}
                className="rounded-2xl"
              />
            </div>
            <div className="w-[40%] flex flex-col gap-3 m-7">
              <h3 className="font-bold pb-3">Thông tin người dùng</h3>
              <p className="flex items-center gap-2 font-semibold">
                <span className="text-gray-500">Tên người dùng:</span>
                {user?.name}
              </p>
              <p className="flex items-center gap-2 font-semibold">
                <span className="text-gray-500">Email:</span>
                {user?.email}
              </p>
              <p className="flex items-center gap-2 font-semibold">
                <span className="text-gray-500">Số điện thoại:</span>
                {user?.numberPhone}
              </p>
              <p className="flex items-center gap-2 font-semibold">
                <span className="text-gray-500">Ngày sinh:</span>
                {user?.birthday}
              </p>
              <p className="flex items-center gap-2 font-semibold">
                <span className="text-gray-500">Giới tính:</span>
                {formatGender(user?.gender)}
              </p>
              <p className="flex items-center gap-2 font-semibold">
                <span className="text-gray-500">Địa chỉ:</span>
                {user?.address || "Không"}
              </p>
              <p className="flex items-center gap-2 font-semibold">
                <span className="text-gray-500">Trạng thái:</span>
                {formatStatusUser(user?.status)}
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
