import {
  userNew,
  bookNew,
  dateBorrowNew,
  borrowItemNew,
  borrowItemTotalPriceMonths,
} from "../services/statistical.service";

export const getDashboardStatistical = async (req, res) => {
  try {
    const [user, book, dateBorrow, borrowItem, borrowItemTotalPrice] =
      await Promise.all([
        userNew(),
        bookNew(),
        dateBorrowNew(),
        borrowItemNew(),
        borrowItemTotalPriceMonths(),
      ]);

    return res.status(200).json({
      message: "Thống kê dữ liệu",
      data: { user, book, dateBorrow, borrowItem, borrowItemTotalPrice },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi khi truy xuất thống kê !",
      error: error.message,
    });
  }
};
