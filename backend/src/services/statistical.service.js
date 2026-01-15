import {
  startCurrentDay,
  endCurrentDay,
  startPreviousDay,
  endPreviousDay,
  startPreviousMonths,
} from "../utils/dateRange.utils";
import { calcPercentChange } from "../utils/calcPercent.utils";
import Users from "../Models/users.model";
import Books from "../Models/books.model";
import DateBorrows from "../Models/dateBorrow.model";
import BorrowItems from "../Models/borrowItem.model";

export const userNew = async () => {
  const userCurrentDay = await Users.countDocuments({
    createdAt: {
      $gte: startCurrentDay,
      $lte: endCurrentDay,
    },
  });

  const userPreviousDay = await Users.countDocuments({
    createdAt: {
      $gte: startPreviousDay,
      $lte: endPreviousDay,
    },
  });

  return {
    total: userCurrentDay,
    percent: calcPercentChange(userCurrentDay, userPreviousDay),
  };
};

export const bookNew = async () => {
  const bookCurrentDay = await Books.countDocuments({
    createdAt: {
      $gte: startCurrentDay,
      $lte: endCurrentDay,
    },
  });

  const bookPreviousDay = await Books.countDocuments({
    createdAt: {
      $gte: startPreviousDay,
      $lte: endPreviousDay,
    },
  });

  return {
    total: bookCurrentDay,
    percent: calcPercentChange(bookCurrentDay, bookPreviousDay),
  };
};

export const dateBorrowNew = async () => {
  const dateBorrowCurrentDay = await DateBorrows.countDocuments({
    createdAt: {
      $gte: startCurrentDay,
      $lte: endCurrentDay,
    },
  });

  const dateBorrowPreviousDay = await DateBorrows.countDocuments({
    createdAt: {
      $gte: startPreviousDay,
      $lte: endPreviousDay,
    },
  });

  return {
    total: dateBorrowCurrentDay,
    percent: calcPercentChange(dateBorrowCurrentDay, dateBorrowPreviousDay),
  };
};

export const borrowItemNew = async () => {
  const borrowItemCurrentDay = await BorrowItems.countDocuments({
    createdAt: {
      $gte: startCurrentDay,
      $lte: endCurrentDay,
    },
  });

  const borrowItemPreviousDay = await BorrowItems.countDocuments({
    createdAt: {
      $gte: startPreviousDay,
      $lte: endPreviousDay,
    },
  });

  return {
    total: borrowItemCurrentDay,
    percent: calcPercentChange(borrowItemCurrentDay, borrowItemPreviousDay),
  };
};

export const borrowItemTotalPriceMonths = async () => {
  const result = await BorrowItems.aggregate([
    {
      $match: {
        createdAt: { $gte: startPreviousMonths, $lte: endPreviousDay },
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        totalPrice: { $sum: "$totalPrice" },
      },
    },
    { $sort: { "_id.year": 1, "_id.month": 1 } },
  ]);

  return result;
};
