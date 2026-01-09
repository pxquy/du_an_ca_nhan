import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import { Button, message, Popconfirm, Table } from "antd";
import type {
  IApiResponse,
  IErrorMessage,
  IResponse,
} from "../../../Types/data";
import { QueryKey } from "../../../constants/QueryKey";
import type { IBooks } from "../../../Types/books";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { usePageStore } from "../../../stores/PageStore";
import {
  AddBookModal,
  EditBookModal,
} from "../../../Components/BookModal/FormBookModal";
import { useOpen } from "../../../stores/openStore";
import { DetailBookModal } from "../../../Components/BookModal/DetailBookModal";
import { Api } from "../../../Api/api";

const BooksPage = () => {
  const queryClient = useQueryClient();
  const { page, pageSize, setPage, setPageSize } = usePageStore();
  const {
    openAdd,
    openEdit,
    openDetail,
    openId,
    setOpenAdd,
    setOpenEdit,
    setOpenDetail,
    setOpenId,
  } = useOpen();
  const result = useQueries({
    queries: [
      {
        queryKey: [QueryKey.BOOKS, page, pageSize],
        queryFn: async () => {
          const res = await Api.get<IApiResponse<IResponse<IBooks>>>(`books`);
          // console.log(res.data.data);
          return res.data.data;
        },
      },
    ],
  });

  const books = result[0].data;
  // console.log("books", books?.docs[0].author_id._id);
  const isLoading = result.some((r) => r.isLoading);

  const mutation = useMutation({
    mutationFn: async (payload: { _id: string; status: string }) => {
      await Api.post("auth/refresh-token");
      const { data } = await Api.patch(`books/${payload._id}`, {
        status: payload.status,
      });
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

  const mutationDelete = useMutation({
    mutationFn: async (_id: string) => {
      await Api.delete(`books/${_id}`, {
        withCredentials: true,
      });
      return _id;
    },
    onSuccess: (_id: string) => {
      message.success("Xoá sách thành công!");
      queryClient.invalidateQueries({
        queryKey: [QueryKey.BOOKS, page, pageSize],
      });
    },
    onError: (error: IErrorMessage) => {
      const err = error.response.data as IErrorMessage;
      message.error(err.message || "Xoá thất bại");
    },
  });

  const handelStatus = (_id: string, status: string) => {
    mutation.mutate({ _id, status });
  };

  const handleDelete = (_id: string) => {
    mutationDelete.mutate(_id as any);
  };

  const columns: ColumnsType<IBooks> = [
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
          <img
            src={image}
            alt="Hình ảnh sách"
            className="w-20 rounded-full h-20 object-cover"
          />
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
      title: "Tác giả",
      dataIndex: "author_id",
      key: "author_id",
      render: (author_id: { name: string }) => {
        return author_id ? author_id.name : "";
      },
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
                  ? "bg-green-400 p-1 rounded-3xl text-white focus:outline-none font-bold text-shadow-2xs"
                  : "bg-red-500 p-1 rounded-3xl text-white focus:outline-none font-bold text-shadow-2xs"
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
      render: (_id: string, record: IBooks) => {
        return (
          <div className="flex gap-2">
            <DetailBookModal open={openDetail} detailBook={record}>
              <Button
                variant="solid"
                color="cyan"
                onClick={() => {
                  setOpenId(record._id);
                  setOpenDetail(true);
                }}
              >
                <EyeOutlined />
              </Button>
            </DetailBookModal>
            <EditBookModal open={openEdit} book={record}>
              <Button
                type="primary"
                onClick={() => {
                  setOpenId(record._id), setOpenEdit(true);
                }}
              >
                <EditOutlined />
              </Button>
            </EditBookModal>
            <Popconfirm
              title={`Xoá sách`}
              description="Bạn chắc chắn muốn xoá sách này?"
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
      {isLoading}
      <section className="relative p-6 flex flex-col gap-3">
        <div>
          <AddBookModal open={openAdd}>
            <button
              className="p-2 bg-blue-400 m-2 rounded-[5px] text-white hover:bg-blue-600 hover:font-bold cursor-pointer"
              onClick={() => setOpenAdd(true)}
            >
              <PlusOutlined className="pr-1" />
              Thêm sách mới
            </button>
          </AddBookModal>
        </div>
        <Table
          dataSource={books?.docs}
          columns={columns}
          rowKey="_id"
          pagination={{
            current: page,
            pageSize: pageSize,
            total: books?.docs?.length,
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
