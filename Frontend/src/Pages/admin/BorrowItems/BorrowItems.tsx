import { EditOutlined, EyeOutlined, PlusOutlined } from "@ant-design/icons";
import { useQueries } from "@tanstack/react-query";
import { Button, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { QueryKey } from "../../../constants/QueryKey";
import type { IApiResponse, IResponse } from "../../../Types/data";
import type { IBorrowItems } from "../../../Types/borrowItems";
import { usePageStore } from "../../../stores/PageStore";
import { useOpen } from "../../../stores/openStore";
import { DetailBorrowItemModal } from "../../../Components/BorrowItemModal/DetailBorrowItemModal";
import {
  AddBorrowItem,
  EditBorrowItem,
} from "../../../Components/BorrowItemModal/FormBorrowItemModal";
import { Api } from "../../../Api/api";
import { formatStatusBorrow } from "../../../constants/Helper";

const BorrowItems = () => {
  const { page, pageSize, setPage, setPageSize } = usePageStore();
  const { openId, openDetail, setOpenId, setOpenDetail } = useOpen();
  const { openAdd, openEdit, setOpenAdd, setOpenEdit } = useOpen();
  const result = useQueries({
    queries: [
      {
        queryKey: [QueryKey.BORROW_ITEMS, page, pageSize],
        queryFn: async () => {
          const { data } = await Api.get<IApiResponse<IResponse<IBorrowItems>>>(
            `borrowItems`
          );
          return data.data;
        },
      },
    ],
  });

  const borrowItems = result[0].data;
  //   console.log("dateborrows", dateBorrows?.docs[0]?.user_id.name);

  const columns: ColumnsType<IBorrowItems> = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Sách được mượn",
      dataIndex: "book_id",
      key: "book_id",
      render: (book_id: { name: string }) => {
        return book_id?.name;
      },
    },

    {
      title: "số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        return (
          <>
            <div
              className={`${
                status === "1"
                  ? "bg-amber-300"
                  : status === "2"
                  ? "bg-green-500"
                  : "bg-red-500"
              } w-25 rounded-2xl p-1 text-white text-center font-semibold text-shadow-2xs`}
            >
              {formatStatusBorrow(status)}
            </div>
          </>
        );
      },
    },

    {
      title: "Hành động",
      dataIndex: "_id",
      key: "_id",
      render: (_id: string, record: IBorrowItems) => {
        console.log("record", record);
        return (
          <div className="flex gap-2">
            <DetailBorrowItemModal borrow={record} open={openDetail}>
              <Button
                variant="solid"
                color="cyan"
                onClick={() => {
                  setOpenId(record._id), setOpenDetail(true);
                }}
              >
                <EyeOutlined />
              </Button>
            </DetailBorrowItemModal>
            <EditBorrowItem open={openEdit} borrowItem={record}>
              <Button
                type="primary"
                onClick={() => {
                  setOpenId(record._id), setOpenEdit(true);
                }}
              >
                <EditOutlined />
              </Button>
            </EditBorrowItem>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <section className="relative p-6 flex flex-col gap-3">
        <div>
          <AddBorrowItem open={openAdd}>
            <button
              className="p-2 bg-blue-400 m-2 rounded-[5px] text-white hover:bg-blue-600 hover:font-bold cursor-pointer"
              onClick={() => setOpenAdd(true)}
            >
              <PlusOutlined className="pr-1" />
              Thêm sách được mượn
            </button>
          </AddBorrowItem>
        </div>
        <Table
          rowKey="_id"
          dataSource={borrowItems?.docs}
          columns={columns}
          pagination={{
            current: page,
            pageSize: pageSize,
            total: borrowItems?.docs.length,
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

export default BorrowItems;
