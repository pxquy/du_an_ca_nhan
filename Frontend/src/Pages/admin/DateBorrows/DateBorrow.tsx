import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useQueries } from "@tanstack/react-query";
import { Button, Popconfirm, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import { QueryKey } from "../../../constants/QueryKey";
import axios from "axios";
import type { IApiResponse, IResponse } from "../../../Types/data";
import type { IDateBorrows } from "../../../Types/dateBorrows";
import { usePageStore } from "../../../stores/PageStore";
import { Api } from "../../../Api/api";

const DateBorrow = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLocationAdd =
    location.pathname === "/admin/dateBorrows/addDateBorrow";
  const isLocationEdit = location.pathname.startsWith(
    "/admin/dateBorrows/editDateBorrow"
  );
  const { page, pageSize, setPage, setPageSize } = usePageStore();
  const result = useQueries({
    queries: [
      {
        queryKey: [QueryKey.DATEBORROWS, page, pageSize],
        queryFn: async () => {
          const { data } = await Api.get<IApiResponse<IResponse<IDateBorrows>>>(
            `dateBorrows`
          );
          return data.data;
        },
      },
    ],
  });

  const dateBorrows = result[0].data;
  //   console.log("dateborrows", dateBorrows?.docs[0]?.user_id.name);

  const columns: ColumnsType<IDateBorrows> = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Người mượn sách",
      dataIndex: "user_id",
      key: "user_id",
      render: (user_id: { name: string }) => {
        return user_id?.name;
      },
    },
    {
      title: "Ngày mượn",
      dataIndex: "borrow_date",
      key: "borrow_date",
    },
    {
      title: "Ngày phải trả",
      dataIndex: "return_date",
      key: "return_date",
    },
    {
      title: "Hành động",
      dataIndex: "_id",
      key: "_id",
      render: (_id: string) => {
        return (
          <div className="flex gap-2">
            <Button
              variant="solid"
              color="cyan"
              onClick={() => navigate(`/admin/detailDateBorrow/${_id}`)}
            >
              <EyeOutlined />
            </Button>
            <Button
              type="primary"
              onClick={() =>
                navigate(`/admin/dateBorrows/editDateBorrow/${_id}`)
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
        className={
          isLocationAdd || isLocationEdit
            ? "h-[100vh] bg-black opacity-20"
            : "bg-white"
        }
      >
        <section className="relative p-6 flex flex-col gap-3">
          <div>
            <Link
              to="/admin/dateBorrows/addDateBorrow"
              className="p-2 bg-blue-400 m-2 rounded-[5px] text-white hover:bg-blue-600 hover:font-bold"
            >
              <PlusOutlined className="pr-1" />
              Thêm người mượn mới
            </Link>
          </div>
          <Table
            rowKey="_id"
            dataSource={dateBorrows?.docs}
            columns={columns}
            pagination={{
              current: page,
              pageSize: pageSize,
              total: dateBorrows?.docs.length,
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

export default DateBorrow;
