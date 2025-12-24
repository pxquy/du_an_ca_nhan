import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, message, Popconfirm, Table } from "antd";
import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import { API, QueryKey } from "../../../constants/QueryKey";
import axios from "axios";
import type { IApiResponse, IResponse } from "../../../Types/data";
import type { IAuthors } from "../../../Types/authors";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { usePageStore } from "../../../stores/PageStore";

const AuthorsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const isLocationAdd = location.pathname === "/admin/authors/addAuthor";
  const isLocationEdit = location.pathname.startsWith(
    "/admin/authors/editAuthor"
  );
  const { page, pageSize, setPage, setPageSize } = usePageStore();

  const { data, isLoading } = useQuery({
    queryKey: [QueryKey.AUTHORS],
    queryFn: async () => {
      const res = await axios.get<IApiResponse<IResponse<IAuthors[]>>>(
        `${API}/authors`
      );
      return res.data.data;
    },
  });

  const mutationDelete = useMutation({
    mutationFn: async (_id) => {
      await axios.delete(`${API}/authors/${_id}`, { withCredentials: true });
      return _id;
    },
    onSuccess: (_id) => {
      message.success("Xoá tác giả thành công");
      queryClient.invalidateQueries({
        queryKey: [QueryKey.AUTHORS],
      });
    },
  });

  const handleDelete = (_id: string) => {
    mutationDelete.mutate(_id as any);
  };

  if (isLoading) {
    return <span>Đang tải dữu liệu...</span>;
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
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Ngày sinh",
      dataIndex: "birthday",
      key: "birthday",
    },
    {
      title: "Số điện thoại",
      dataIndex: "numberPhone",
      key: "numberPhone",
    },
    {
      title: "Hành động",
      dataIndex: "_id",
      key: "_id",
      render: (_id: string) => {
        return (
          <div className="flex gap-2">
            {/* <Button
              variant="solid"
              color="cyan"
              onClick={() => navigate(`/admin/detailAuthor/${_id}`)}
            >
              <EyeOutlined />
            </Button> */}
            <Button
              type="primary"
              onClick={() => navigate(`/admin/authors/editAuthor/${_id}`)}
            >
              <EditOutlined />
            </Button>
            <Popconfirm
              title={`Xoá tác giả`}
              description="Bạn chắc chắn muốn xoá tác giả này?"
              okText="Đồng ý"
              cancelText="Từ chối"
              onConfirm={() => handleDelete(_id)}
            >
              <Button danger>
                <DeleteOutlined />
              </Button>
            </Popconfirm>
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
        <section className="p-6 flex flex-col gap-3 ">
          <div>
            <Link
              to="/admin/authors/addAuthor"
              className="p-2 bg-blue-400 m-2 rounded-[5px] text-white hover:bg-blue-600 hover:font-bold"
            >
              <PlusOutlined className="pr-1" />
              Thêm tác giả mới
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

export default AuthorsPage;
