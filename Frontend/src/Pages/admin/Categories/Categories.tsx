import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, message, Popconfirm, Table } from "antd";
import axios from "axios";

import type {
  IApiResponse,
  IErrorMessage,
  IResponse,
} from "../../../Types/data";
import { API, QueryKey } from "../../../constants/QueryKey";
import type { ICategories } from "../../../Types/categories";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { usePageStore } from "../../../stores/PageStore";
import {
  AddCategoryModal,
  EditCategoryModal,
} from "../../../Components/CategoriesModal/FormCategoryModal";
import { useOpen } from "../../../stores/openStore";
const CategoriesPage = () => {
  const { page, pageSize, setPage, setPageSize } = usePageStore();
  const { openAdd, openEdit, setOpenAdd, setOpenEdit } = useOpen();
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: [QueryKey.CATEGORIES, page, pageSize],
    queryFn: async () => {
      const res = await axios.get<IApiResponse<IResponse<ICategories>>>(
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
      render: (_id: string, recode: ICategories) => {
        return (
          <div className="flex gap-2">
            {/* <Button
              variant="solid"
              color="cyan"
              onClick={() => navigate(`/admin/detailCategory/${_id}`)}
            >
              <EyeOutlined />
            </Button> */}
            <EditCategoryModal open={openEdit} category={recode}>
              <Button type="primary" onClick={() => setOpenEdit(true)}>
                <EditOutlined />
              </Button>
            </EditCategoryModal>
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
      <div>
        <section className="p-6 flex flex-col gap-3 ">
          <div>
            <AddCategoryModal open={openAdd}>
              <button
                className="p-2 bg-blue-400 m-2 rounded-[5px] text-white hover:bg-blue-600 hover:font-bold cursor-pointer"
                onClick={() => setOpenAdd(true)}
              >
                <PlusOutlined className="pr-1" />
                Thêm thể loại mới
              </button>
            </AddCategoryModal>
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
    </>
  );
};

export default CategoriesPage;
