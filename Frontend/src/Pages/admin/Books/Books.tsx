import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, message, Popconfirm, Table } from "antd";
import axios from "axios";
import { useState } from "react";
import type {
  IApiResponse,
  IErrorMessage,
  IResponse,
} from "../../../Types/data";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import { API, QueryKey } from "../../../constants/QueryKey";
import type { IBooks } from "../../../Types/books";
import { PlusOutlined } from "@ant-design/icons";
import { formatStatus } from "../../../constants/helper";
import type { ColumnsType } from "antd/es/table";

const BooksPage = () => {
  const location = useLocation();
  const isLocationAdd = location.pathname === "/admin/books/addBook";
  const isLocationEdit = location.pathname.startsWith("/admin/books/editBook");
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const { data, isLoading } = useQuery({
    queryKey: [QueryKey.BOOKS, page, pageSize],
    queryFn: async () => {
      9;
      const res = await axios.get<IApiResponse<IResponse<IBooks[]>>>(
        `${API}/books`
      );
      console.log(res.data.data);
      return res.data.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (payload: { _id: string; status: string }) => {
      const { data } = await axios.patch(
        `http://localhost:3000/api/books/${payload._id}`,
        { status: payload.status }
      );
      return data;
    },
    onSuccess: () => {
      message.success("Cập nhật thành công");
      queryClient.invalidateQueries({
        queryKey: [QueryKey.BOOKS, page, pageSize],
      });
    },
    onError: (error: IErrorMessage) => {
      const err = error.response?.data as IErrorMessage;
      message.error(err?.message || "Có lỗi xảy ra");
    },
  });

  const handelStatus = (_id: string, status: string) => {
    mutation.mutate({ _id, status });
  };

  if (isLoading) {
    return <span>Đang tải dữ liệu...</span>;
  }

  const columns: ColumnsType<IBooks[]> = [
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
      render: (image: string) => (
        <>
          <img src={image} alt="Hình ảnh sách" />
        </>
      ),
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
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status, recode: any) => {
        let isAvailable = status === "1";
        return (
          <div>
            <select
              name=""
              id=""
              value={status}
              className={
                isAvailable
                  ? "bg-green-400 p-1 rounded-3xl text-white focus:outline-none font-bold"
                  : "bg-red-500 p-1 rounded-3xl text-white focus:outline-none font-bold"
              }
              onChange={(e) => handelStatus(recode._id, e.target.value)}
            >
              <option value="" hidden>
                {isAvailable ? "Còn sách" : "Hết sách"}
              </option>
              {isAvailable ? (
                <option value="2" className="bg-red-500">
                  Hết sách
                </option>
              ) : (
                <option value="1" className="bg-green-500">
                  Còn sách
                </option>
              )}
            </select>
          </div>
        );
      },
    },
    {
      title: "Hành động",
      dataIndex: "_id",
      key: "_id",
      render: (_id) => {
        return (
          <div className="flex gap-2">
            <Button
              type="primary"
              onClick={() => navigate(`/admin/books/editBook/${_id}`)}
            >
              Sửa
            </Button>
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
              to="/admin/books/addBook"
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
      </div>
      <div className="absolute top-30 left-130">
        <Outlet />
      </div>
    </>
  );
};

export default BooksPage;
