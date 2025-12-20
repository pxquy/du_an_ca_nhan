import { useQuery } from "@tanstack/react-query";
import { Button, Popconfirm, Table } from "antd";
import axios from "axios";
import { useState } from "react";
import type { IApiResponse, IResponse } from "../../Types/data";
import { API, QueryKey } from "../../constants/QueryKey";
import type { ICategories } from "../../Types/categories";
import { PlusOutlined } from "@ant-design/icons";
import { Link, Outlet, useLocation } from "react-router";
const CategoriesPage = () => {
  const location = useLocation();
  const isLocation = location.pathname === "/admin/categories/addCategory";
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const { data, isLoading } = useQuery({
    queryKey: [QueryKey.CATEGORIES, page, pageSize],
    queryFn: async () => {
      const res = await axios.get<IApiResponse<IResponse<ICategories[]>>>(
        `${API}/categories`
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
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
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
              title={`Xoá thể loại sách`}
              description="Bạn chắc chắn muốn xoá thể loại sách này?"
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
      <div
        className={isLocation ? "h-[100vh] bg-black opacity-20" : "bg-white"}
      >
        <section className="m-6 flex flex-col gap-3 ">
          <div>
            <Link
              to="/admin/categories/addCategory"
              className="p-2 bg-blue-400 m-2 rounded-[5px] text-white hover:bg-blue-600 hover:font-bold"
            >
              <PlusOutlined className="pr-1" />
              Thêm thể loại mới
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
      </div>
      <div className="absolute top-30 left-130">
        <Outlet />
      </div>
    </>
  );
};

export default CategoriesPage;
