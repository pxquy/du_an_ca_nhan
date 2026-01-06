import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, message, Popconfirm, Table } from "antd";
import { QueryKey } from "../../../constants/QueryKey";
import type { IApiResponse, IResponse } from "../../../Types/data";
import type { IAuthors } from "../../../Types/authors";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { usePageStore } from "../../../stores/PageStore";
import { useOpen } from "../../../stores/openStore";
import {
  AddAuthorModal,
  EditAuthorModal,
} from "../../../Components/AuthorModal/FormAuthorModal";
import { Api } from "../../../Api/api";

const AuthorsPage = () => {
  const { openId, openAdd, openEdit, setOpenId, setOpenEdit, setOpenAdd } =
    useOpen();
  const queryClient = useQueryClient();
  const { page, pageSize, setPage, setPageSize } = usePageStore();

  const { data, isLoading } = useQuery({
    queryKey: [QueryKey.AUTHORS],
    queryFn: async () => {
      const res = await Api.get<IApiResponse<IResponse<IAuthors>>>(`authors`);
      return res.data.data;
    },
  });

  const mutationDelete = useMutation({
    mutationFn: async (_id) => {
      await Api.delete(`authors/${_id}`);
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
      render: (_id: string, record: IAuthors) => {
        return (
          <>
            <div className="flex gap-2">
              {/* <Button
              variant="solid"
              color="cyan"
              onClick={() => navigate(`/admin/detailAuthor/${_id}`)}
            >
              <EyeOutlined />
            </Button> */}
              <EditAuthorModal open={openEdit} author={record}>
                <Button
                  type="primary"
                  onClick={() => {
                    setOpenId(record._id), setOpenEdit(true);
                  }}
                >
                  <EditOutlined />
                </Button>
              </EditAuthorModal>
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
          </>
        );
      },
    },
  ];
  return (
    <>
      <section className="p-6 flex flex-col gap-3 ">
        <div>
          <AddAuthorModal open={openAdd}>
            <button
              onClick={() => setOpenAdd(true)}
              className="p-2 bg-blue-400 m-2 rounded-[5px] text-white hover:bg-blue-600 hover:font-bold cursor-pointer"
            >
              <PlusOutlined className="pr-1" />
              Thêm tác giả mới
            </button>
          </AddAuthorModal>
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

export default AuthorsPage;
