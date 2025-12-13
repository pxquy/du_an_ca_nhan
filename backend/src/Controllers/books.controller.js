import Books from "../Models/books.model";

export const getAll = async (req, res) => {
  const options = {
    populate: [
      { path: "category_id", select: "name" },
      { path: "author_id", select: "name" },
    ],
  };
  try {
    const books = await Books.paginate({}, options);
    if (books.length == 0)
      return res.status(200).json({
        message: "Hiện tại chưa có sách trong thư viện",
        data: [],
      });

    return res.status(200).json({
      message: "Danh sách sách",
      data: books,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi dữ liệu khi lấy danh sách sách",
      error: error.message,
    });
  }
};

export const createBook = async (req, res) => {
  try {
    const createBook = await Books.create({ ...req.body });

    return res.status(201).json({
      message: "Thêm sách mới thành công",
      data: createBook,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi dữ liệu khi thêm sách mới",
      error: error.message,
    });
  }
};

export const getById = async (req, res) => {
  try {
    const getById = await Books.findById(req.params.id)
      .populate("category_id", "name")
      .populate("author_id", "name");

    if (!getById)
      return res.status(404).json({
        message: "Không tìm thấy ID thông tin sách phù hợp",
      });

    return res.status(200).json({
      message: "Thông tin chi tiết sách",
      data: getById,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi dữ liệu khi lấy thông tin chi tiết sách!",
      error: error.message,
    });
  }
};

export const updateBook = async (req, res) => {
  try {
    const updateBook = await Books.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );

    if (!updateBook)
      return res.status(404).json({
        message: "Không tìm thấy ID sách cần sửa phù hợp",
      });

    return res.status(200).json({
      message: "Cập nhật thông tin sách thành công",
      data: updateBook,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi dữ liệu khi cập nhật thông tin sách!",
      error: error.message,
    });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const deleteBook = await Books.findByIdAndDelete(req.params.id);

    if (!deleteBook)
      return res.status(404).json({
        message: "Không tìm thấy ID sách cần xoá!",
      });

    return res.status(200).json({
      message: "Xoá sách thành công",
      data: deleteBook,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi dữ liệu khi xoá sách!",
      error: error.message,
    });
  }
};
