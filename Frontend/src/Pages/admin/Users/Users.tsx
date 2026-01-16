import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, message, Popconfirm, Table } from "antd";
import { QueryKey } from "../../../constants/QueryKey";
import type {
  IApiResponse,
  IErrorMessage,
  IResponse,
} from "../../../Types/data";
import { EyeOutlined } from "@ant-design/icons";
import { usePageStore } from "../../../stores/PageStore";
import { Api } from "../../../Api/api";
import type { IUsers } from "../../../Types/user";
import { useOpen } from "../../../stores/openStore";
import { DetailUserModal } from "../../../Components/UserModal/DetailUserModa";

const Users = () => {
  const queryClient = useQueryClient();
  const { page, pageSize, setPage, setPageSize } = usePageStore();
  const { openDetail, setOpenId, setOpenDetail } = useOpen();

  const { data, isLoading } = useQuery({
    queryKey: [QueryKey.USERS, page, pageSize],
    queryFn: async () => {
      const res = await Api.get<IApiResponse<IResponse<IUsers>>>(`users`);
      // console.log("data", res.data.data);
      return res.data.data;
    },
  });

  const mutationStatus = useMutation({
    mutationFn: async (payload: { _id: string; status: string }) => {
      console.log("_id: ", payload._id);
      const { data } = await Api.patch(`users/lock-user/${payload._id}`, {
        status: payload.status,
      });
      return data;
    },
    onSuccess: () => {
      message.success("Khoá người dùng thành công");
      queryClient.invalidateQueries({
        queryKey: [QueryKey.USERS, page, pageSize],
      });
    },
    onError: (error: IErrorMessage) => {
      const err = error.response?.data as IErrorMessage;
      message.error(err.message || "Khoá người dùng thất bại!");
    },
  });

  const handelLock = (_id: any, status: any) => {
    mutationStatus.mutate({ _id, status });
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
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: string, record: IUsers) => {
        const isAvailable = status === "1";
        return (
          <>
            <select
              name=""
              id=""
              value={status}
              className={
                isAvailable
                  ? "bg-green-400 p-1 rounded-3xl text-white focus:outline-none font-bold text-shadow-2xs"
                  : "bg-red-500 p-1 rounded-3xl text-white focus:outline-none font-bold text-shadow-2xs"
              }
              onChange={(e) => handelLock(record._id, e.target.value)}
            >
              <option value="" hidden>
                {isAvailable ? "Hoạt động" : "Bị khoá"}
              </option>
              {isAvailable ? (
                <option value="2" className="bg-red-500">
                  Bị khoá
                </option>
              ) : (
                <option value="1" className="bg-green-500">
                  Hoạt động
                </option>
              )}
            </select>
          </>
        );
      },
    },
    {
      title: "Hành động",
      dataIndex: "_id",
      key: "_id",
      render: (__: any, record: IUsers) => {
        return (
          <>
            <div className="flex gap-2">
              <DetailUserModal user={record} open={openDetail}>
                <Button
                  variant="solid"
                  color="cyan"
                  onClick={() => {
                    setOpenId(record._id), setOpenDetail(true);
                  }}
                >
                  <EyeOutlined />
                </Button>
              </DetailUserModal>
            </div>
          </>
        );
      },
    },
  ];
  return (
    <>
      <section className="p-6 flex flex-col gap-3 ">
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

export default Users;
