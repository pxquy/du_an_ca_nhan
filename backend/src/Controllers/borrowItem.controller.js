import Books from "../Models/books.model";
import BorrowItems from "../Models/borrowItem.model";

export const getAll = async (req, res) => {
  const options = {
    populate: [
      { path: "book_id", select: "name" },
      { path: "dateBorrow_id", populate: { path: "user_id", select: "name" } },
    ],
  };
  try {
    const borrowItems = await BorrowItems.paginate({}, options);

    if (!borrowItems.length == 0)
      return res.status(200).json({
        message: "Hiện tại chưa có sách nào được mượn",
        data: [],
      });

    return res.status(200).json({
      message: "Danh sách, sách đang được mượn",
      data: borrowItems,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi khi lấy dữ liệu chi tiết sách được mượn!",
      error: error.message,
    });
  }
};

export const createBorrowItem = async (req, res) => {
  try {
    const { book_id, quantity } = req.body;

    if (!book_id || !quantity)
      return res.status(404).json({
        message: "Không được để trống hoặc thiếu ID sách và số lượng!",
      });

    const book = await Books.findById(book_id);

    if (!book)
      return res.status(404).json({
        message: "Không tìm thấy thông tin ID sách!",
      });

    const price = book.price;

    const totalPrice = price * quantity;

    const createBorrowItem = await BorrowItems.create({
      ...req.body,
      totalPrice: totalPrice,
    });

    return res.status(201).json({
      message: "Mượn sách thành công",
      data: createBorrowItem,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi khi thêm dữ liệu sách được mượn",
      error: error.message,
    });
  }
};

export const getById = async (req, res) => {
  try {
    const getById = await BorrowItems.findById(req.params.id)
      .populate("book_id", "name")
      .populate({
        path: "dateBorrow_id",
        select: ["borrow_date", "return_date"],
        populate: { path: "user_id", select: "name" },
      });
    if (!getById)
      return res.status(404).json({
        message: "Lỗi dữ liệu khi lấy thông tin chi tiết sách được mượn!",
      });

    return res.status(200).json({
      message: "Thông tin chi tiết sách được mượn",
      data: getById,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi dữ liệu khi lấy chi tiết sách được mượn",
      error: error.message,
    });
  }
};

export const updateBorrowItem = async (req, res) => {
  try {
    const { book_id, quantity } = req.body;

    if (!book_id || !quantity)
      return res.status(404).json({
        message: "Thiếu thông tin ID sách hoặc số lượng mượn",
      });

    const book = await Books.findOne({ _id: book_id });

    const totalPrice = book.price * quantity;
    const updateBorrowItem = await BorrowItems.findByIdAndUpdate(
      req.params.id,
      { ...req.body, totalPrice: totalPrice },
      { new: true }
    );

    if (!updateBorrowItem)
      return res.status(404).json({
        message: "Không tìm thấu đữ liệu sách cần cập nhật!",
      });

    return res.status(200).json({
      message: "Cập nhật dữ liệu mượn sách thành công",
      data: updateBorrowItem,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi dữ liệu khi cập nhật thông tin mượn sách",
      error: error.message,
    });
  }
};
