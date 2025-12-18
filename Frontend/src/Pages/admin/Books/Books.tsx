import { useQuery } from "@tanstack/react-query";
import { Button, Popconfirm, Table } from "antd";
import axios from "axios";
import { useState } from "react";
import type { IApiResponse, IResponse } from "../../../Types/data";
import { Link } from "react-router";
import { API, QueryKey } from "../../../constants/QueryKey";
import type { IBooks } from "../../../Types/books";
import { PlusOutlined } from "@ant-design/icons";

const BooksPage = () => {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const { data, isLoading } = useQuery({
    queryKey: [QueryKey.BOOKS, page, pageSize],
    queryFn: async () => {
      const res = await axios.get<IApiResponse<IResponse<IBooks[]>>>(
        `${API}/books`
      );
      console.log(res.data.data);
      return res.data.data;
    },
  });

  if (isLoading) {
    return <span>Đang tải dữ liệu...</span>;
  }

  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
    },
    {
      title: "Ngày xuất bản",
      dataIndex: "publish",
      key: "publish",
    },
    {
      title: "Giá sách",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Hành động",
      dataIndex: "_id",
      key: "_id",
      render: (_id: number) => {
        return (
          <div className="flex gap-2">
            <Button type="primary">Sửa</Button>
            <Popconfirm
              title={`Xoá sách`}
              description="Bạn chắc chắn muốn xoá sách này?"
              okText="Đồng ý"
              cancelText="Từ chối"
            >
              <Button danger>Delete</Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <section className="m-6 flex flex-col gap-3 ">
        <div>
          <Link
            to=""
            className="p-2 bg-blue-400 m-2 rounded-[5px] text-white hover:bg-blue-600 hover:font-bold"
          >
            <PlusOutlined className="pr-1" />
            Thêm sách mới
          </Link>
        </div>
        <Table
          dataSource={data?.docs}
          columns={columns}
          rowKey="_id"
          pagination={{
            current: page,
            pageSize: pageSize,
            total: data?.docs?.length,
            onChange(p: number, ps: number) {
              setPage(p);
              setPageSize(ps);
            },
          }}
        />
      </section>
    </>
  );
};

export default BooksPage;
