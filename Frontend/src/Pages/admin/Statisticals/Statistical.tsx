import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "../../../constants/QueryKey";
import { StatisticalApi } from "../../../services/statisticalApi";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Line } from "react-chartjs-2";
import { options } from "../../../Types/chartjs";

const Statistical = () => {
  const { data: statistical, isLoading } = useQuery({
    queryKey: [QueryKey.STATISTICAL],
    queryFn: StatisticalApi,
  });

  if (isLoading) {
    return <span>Đang tải dữu liệu...</span>;
  }

  const chartData = {
    labels: statistical.borrowItemTotalPrice.map(
      (item: { _id: { month: string } }) => `Tháng ${item._id.month}`
    ),
    datasets: [
      {
        label: "Doanh thu",
        data: statistical.borrowItemTotalPrice.map(
          (item: { totalPrice: number }) => item.totalPrice
        ),
        fill: true,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(225, 225, 235, 0.5)",
        tension: 0.4,
      },
    ],
  };

  return (
    <>
      {isLoading}
      <div className="p-5 mt-5">
        <div className="flex items-center justify-between">
          <div className="flex flex-col justify-between items-center border border-gray-300 w-67 bg-white rounded-2xl h-40">
            <p className="text-[15px] text-gray-500 font-semibold p-2">
              Người dùng mới
            </p>
            <p className="text-3xl">{statistical.user.total}</p>
            {statistical.user.percent < 0 ? (
              <p className="flex items-center gap-1 text-[12px] text-gray-500 pb-2">
                <span className="text-red-500">
                  <ArrowDownOutlined />
                  {statistical.user.percent}%
                </span>{" "}
                Người dùng mới so với tháng trước
              </p>
            ) : (
              <p className="flex items-center gap-1 text-[12px] text-gray-500 pb-2">
                <span className="text-green-500">
                  <ArrowUpOutlined />
                  {statistical.user.percent}%
                </span>
                Người dùng mới so với tháng trước
              </p>
            )}
          </div>
          <div className="flex flex-col justify-between items-center border border-gray-300 w-75 bg-white rounded-2xl h-40">
            <p className="text-[15px] text-gray-500 font-semibold p-2">
              Sách mới
            </p>
            <p className="text-3xl">{statistical.book.total}</p>
            {statistical.book.percent < 0 ? (
              <p className="flex items-center gap-1 text-[12px] text-gray-500 pb-2">
                <span className="text-red-500">
                  <ArrowDownOutlined />
                  {statistical.book.percent}%
                </span>{" "}
                Sách mới so với tháng trước
              </p>
            ) : (
              <p className="flex items-center gap-1 text-[12px] text-gray-500 pb-2">
                <span className="text-green-500">
                  <ArrowUpOutlined />
                  {statistical.book.percent}%
                </span>
                Sách mới so với tháng trước
              </p>
            )}
          </div>
          <div className="flex flex-col justify-between items-center border border-gray-300 w-75 bg-white rounded-2xl h-40">
            <p className="text-[15px] text-gray-500 font-semibold p-2">
              Người mượn sách mới
            </p>
            <p className="text-3xl">{statistical.dateBorrow.total}</p>
            {statistical.dateBorrow.percent < 0 ? (
              <p className="flex items-center gap-1 text-[12px] text-gray-500 pb-2">
                <span className="text-red-500">
                  <ArrowDownOutlined />
                  {statistical.dateBorrow.percent}%
                </span>{" "}
                Người mượn sách mới so với tháng trước
              </p>
            ) : (
              <p className="flex items-center gap-1 text-[12px] text-gray-500 pb-2">
                <span className="text-green-500">
                  <ArrowUpOutlined />
                  {statistical.dateBorrow.percent}%
                </span>
                Người mượn sách mới so với tháng trước
              </p>
            )}
          </div>
          <div className="flex flex-col justify-between items-center border border-gray-300 w-75 bg-white rounded-2xl h-40">
            <p className="text-[15px] text-gray-500 font-semibold p-2">
              Người dùng mới
            </p>
            <p className="text-3xl">{statistical.borrowItem.total}</p>
            {statistical.borrowItem.percent < 0 ? (
              <p className="flex items-center gap-1 text-[12px] text-gray-500 pb-2">
                <span className="text-red-500">
                  <ArrowDownOutlined />
                  {statistical.borrowItem.percent}%
                </span>{" "}
                Sách mới được mượn so với tháng trước
              </p>
            ) : (
              <p className="flex items-center gap-1 text-[12px] text-gray-500 pb-2">
                <span className="text-green-500">
                  <ArrowUpOutlined />
                  {statistical.borrowItem.percent}%
                </span>
                Sách mới được mượn so với tháng trước
              </p>
            )}
          </div>
        </div>
        <div className="mt-15 flex items-center gap-5">
          <div className="w-[60%] h-110 border border-gray-300 bg-white rounded-2xl">
            <div>
              <Line options={options} data={chartData} />
            </div>
          </div>
          <div className="w-[40%] h-110 bg-white rounded-2xl">
            <h2 className="text-center p-2">Người đang mượn sách</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Statistical;
