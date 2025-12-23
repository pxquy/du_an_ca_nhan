import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, message, Popconfirm, Table } from "antd";
import axios from "axios";
import { useState } from "react";
import type {
  IApiResponse,
  IErrorMessage,
  IResponse,
} from "../../../Types/data";
import { API, QueryKey } from "../../../constants/QueryKey";
import type { ICategories } from "../../../Types/categories";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
const CategoriesPage = () => {
  const location = useLocation();
  const isLocationAdd = location.pathname === "/admin/categories/addCategory";
  const isLocationEdit = location.pathname.startsWith(
    "/admin/categories/editCategory"
  );
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const queryClient = useQueryClient();
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

  const mutationDelete = useMutation({
    mutationFn: async (_id) => {
      await axios.delete(`${API}/categories/${_id}`, { withCredentials: true });
      return _id;
    },
    onSuccess: () => {
      message.success("Xoá danh mục thành công!");
      queryClient.invalidateQueries({
        queryKey: [QueryKey.CATEGORIES],
      });
    },
    onError: (error: IErrorMessage) => {
      const err = error?.response.data as IErrorMessage;
      message.error(err.message || "Lỗi khi xoá danh mục!");
    },
  });

  const handleDelete = (_id: string) => {
    mutationDelete.mutate(_id as any);
  };

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
      render: (_id: string) => {
        return (
          <div className="flex gap-2">
            <Button
              variant="solid"
              color="cyan"
              onClick={() => navigate(`/admin/detailCategory/${_id}`)}
            >
              <EyeOutlined />
            </Button>
            <Button
              type="primary"
              onClick={() => navigate(`/admin/categories/editCategory/${_id}`)}
            >
              <EditOutlined />
            </Button>
            <Popconfirm
              title={`Xoá danh mục`}
              description="Bạn chắc chắn muốn xoá danh mục này?"
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
