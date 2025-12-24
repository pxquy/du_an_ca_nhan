import { EditOutlined, EyeOutlined, PlusOutlined } from "@ant-design/icons";
import { useQueries } from "@tanstack/react-query";
import { Button, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import { API, QueryKey } from "../../../constants/QueryKey";
import axios from "axios";
import type { IApiResponse, IResponse } from "../../../Types/data";
import type { IBorrowItems } from "../../../Types/borrowItems";
import { usePageStore } from "../../../stores/PageStore";
import { useOpen } from "../../../stores/openStore";
import { DetailBorrowItemModel } from "../../../Components/BorrowModel/detailBorrowItemModel";

const BorrowItems = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLocationAdd =
    location.pathname === "/admin/borrowItems/addBorrowItem";
  const isLocationEdit = location.pathname.startsWith(
    "/admin/borrowItems/editBorrowItem"
  );
  const { page, pageSize, setPage, setPageSize } = usePageStore();
  const { openDetail, setOpenDetail } = useOpen();
  const result = useQueries({
    queries: [
      {
        queryKey: [QueryKey.BORROWITEMS, page, pageSize],
        queryFn: async () => {
          const { data } = await axios.get<
            IApiResponse<IResponse<IBorrowItems>>
          >(`${API}/borrowItems`);
          return data.data;
        },
      },
    ],
  });

  const borrowItems = result[0].data;
  //   console.log("dateborrows", dateBorrows?.docs[0]?.user_id.name);

  const columns: ColumnsType<IBorrowItems> = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Sách được mượn",
      dataIndex: "book_id",
      key: "book_id",
      render: (book_id: { name: string }) => {
        return book_id?.name;
      },
    },

    {
      title: "số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },

    {
      title: "Hành động",
      dataIndex: "_id",
      key: "_id",
      render: (_id: string, record: IBorrowItems) => {
        return (
          <div className="flex gap-2">
            <DetailBorrowItemModel borrow={record} open={openDetail}>
              <Button
                variant="solid"
                color="cyan"
                onClick={() => setOpenDetail(true)}
              >
                <EyeOutlined />
              </Button>
            </DetailBorrowItemModel>
            <Button
              type="primary"
              onClick={() =>
                navigate(`/admin/borrowItems/editBorrowItem/${_id}`)
              }
            >
              <EditOutlined />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div
        className={`
          ${
            isLocationAdd || isLocationEdit
              ? "h-[100vh] bg-black opacity-20"
              : "bg-white"
          }
        `}
      >
        <section className="relative p-6 flex flex-col gap-3">
          <div>
            <Link
              to="/admin/borrowItems/addBorrowItem"
              className="p-2 bg-blue-400 m-2 rounded-[5px] text-white hover:bg-blue-600 hover:font-bold"
            >
              <PlusOutlined className="pr-1" />
              Thêm sách được mượn
            </Link>
          </div>
          <Table
            rowKey="_id"
            dataSource={borrowItems?.docs}
            columns={columns}
            pagination={{
              current: page,
              pageSize: pageSize,
              total: borrowItems?.docs.length,
              onChange(p, ps) {
                setPage(p);
                setPageSize(ps);
              },
            }}
          />
        </section>
      </div>
      <div className="absolute top-30 left-130">
        <Outlet />
      </div>
    </>
  );
};

export default BorrowItems;
