import { EditOutlined, EyeOutlined, PlusOutlined } from "@ant-design/icons";
import { useQueries } from "@tanstack/react-query";
import { Button, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { QueryKey } from "../../../constants/QueryKey";
import type { IApiResponse, IResponse } from "../../../Types/data";
import type { IDateBorrows } from "../../../Types/dateBorrows";
import { usePageStore } from "../../../stores/PageStore";
import { Api } from "../../../Api/api";
import { useOpen } from "../../../stores/openStore";
import {
  AddDateBorrow,
  EditDateBorrow,
} from "../../../Components/DateBorrow/FormDateBorrowModal";
import { DateBorrowDetailModal } from "../../../Components/DateBorrow/DateBorrowDetailModal";

const DateBorrow = () => {
  const {
    openId,
    openAdd,
    openEdit,
    openDetail,
    setOpenId,
    setOpenAdd,
    setOpenEdit,
    setOpenDetail,
  } = useOpen();
  const { page, pageSize, setPage, setPageSize } = usePageStore();
  const result = useQueries({
    queries: [
      {
        queryKey: [QueryKey.DATE_BORROWS, page, pageSize],
        queryFn: async () => {
          const { data } = await Api.get<IApiResponse<IResponse<IDateBorrows>>>(
            `dateBorrows`
          );
          return data.data;
        },
      },
    ],
  });

  const dateBorrows = result[0].data;
  //   console.log("dateborrows", dateBorrows?.docs[0]?.user_id.name);

  const columns: ColumnsType<IDateBorrows> = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Người mượn sách",
      dataIndex: "user_id",
      key: "user_id",
      render: (user_id: { name: string }) => {
        return user_id?.name;
      },
    },
    {
      title: "Ngày mượn",
      dataIndex: "borrow_date",
      key: "borrow_date",
    },
    {
      title: "Ngày phải trả",
      dataIndex: "return_date",
      key: "return_date",
    },
    {
      title: "Hành động",
      dataIndex: "_id",
      key: "_id",
      render: (_id: string, record: IDateBorrows) => {
        return (
          <div className="flex gap-2">
            <DateBorrowDetailModal dateBorrow={record} open={openDetail}>
              <Button
                variant="solid"
                color="cyan"
                onClick={() => {
                  setOpenDetail(true), setOpenId(record._id);
                }}
              >
                <EyeOutlined />
              </Button>
            </DateBorrowDetailModal>
            <EditDateBorrow open={openEdit} dateBorrow={record}>
              <Button
                type="primary"
                onClick={() => {
                  setOpenId(record?._id), setOpenEdit(true);
                }}
              >
                <EditOutlined />
              </Button>
            </EditDateBorrow>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <section className="relative p-6 flex flex-col gap-3">
        <div>
          <AddDateBorrow open={openAdd}>
            <button
              onClick={() => setOpenAdd(true)}
              className="p-2 bg-blue-400 m-2 rounded-[5px] text-white hover:bg-blue-600 hover:font-bold"
            >
              <PlusOutlined className="pr-1" />
              Thêm người mượn mới
            </button>
          </AddDateBorrow>
        </div>
        <Table
          rowKey="_id"
          dataSource={dateBorrows?.docs}
          columns={columns}
          pagination={{
            current: page,
            pageSize: pageSize,
            total: dateBorrows?.docs.length,
            onChange(p, ps) {
              setPage(p);
              setPageSize(ps);
            },
          }}
        />
      </section>
    </>
  );
};

export default DateBorrow;
