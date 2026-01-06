import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QueryKey } from "../../../constants/QueryKey";
import { Api } from "../../../Api/api";
import type { IComments } from "../../../Types/comment";
import type { ColumnsType } from "antd/es/table";
import type { IApiResponse, IResponse } from "../../../Types/data";
import Table from "antd/es/table";
import { usePageStore } from "../../../stores/PageStore";
import { Button, message, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";

const Comments = () => {
  const queryClient = useQueryClient();
  const { page, pageSize, setPage, setPageSize } = usePageStore();
  const { data: comments, isLoading } = useQuery({
    queryKey: [QueryKey.COMMENTS, page, pageSize],
    queryFn: async () => {
      const { data } = await Api.get<IApiResponse<IResponse<IComments>>>(
        "comments"
      );
      console.log("data", data.data);
      return data.data;
    },
  });

  const mutationDelete = useMutation({
    mutationFn: async (_id: string) => {
      await Api.delete(`comments/${_id}`);
      return _id;
    },
    onSuccess: (_id) => {
      message.success("Xoá bình luận thành công!");
      queryClient.invalidateQueries({
        queryKey: [QueryKey.COMMENTS, page, pageSize],
      });
    },
    onError: () => {
      message.error("Xoá bình luận thất bại!");
    },
  });

  const handleDelete = (_id: string) => {
    mutationDelete.mutate(_id);
  };

  if (isLoading) {
    return <span>Đang tải dữ liệu bình luận...</span>;
  }

  const columns: ColumnsType<IComments> = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Tiêu đề bình luận",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Người bình luận",
      dataIndex: "user_id",
      key: "user_id",
      render: (user_id: { name: string }) => {
        return user_id.name;
      },
    },
    {
      title: "Nội dung",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Hành động",
      dataIndex: "_id",
      key: "_id",
      render: (_id: string) => {
        return (
          <div className="flex gap-2">
            <Button variant="solid" color="cyan" onClick={() => {}}>
              <EyeOutlined />
            </Button>
            <Button type="primary" onClick={() => {}}>
              <EditOutlined />
            </Button>
            <Popconfirm
              title={`Xoá bình luận`}
              description="Bạn chắc chắn muốn xoá bình luận này?"
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
      <section className="relative p-6 flex flex-col gap-3">
        <Table
          dataSource={comments?.docs}
          columns={columns}
          rowKey="_id"
          pagination={{
            current: page,
            pageSize: pageSize,
            total: comments?.docs?.length,
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

export default Comments;
