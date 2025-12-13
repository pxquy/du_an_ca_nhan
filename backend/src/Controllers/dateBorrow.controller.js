import DateBorrows from "../Models/dateBorrow.model";

export const getAll = async (req, res) => {
  const options = {
    populate: [{ path: "user_id", select: "name" }],
  };
  try {
    const dateBorrows = await DateBorrows.paginate({}, options);
    if (dateBorrows.length == 0)
      return res.status(200).json({
        message: "Hiện tại chưa có người nào mượn sách trong thư viện",
        data: [],
      });

    return res.status(200).json({
      message: "Danh sách người mượn sách",
      data: dateBorrows,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi dữ liệu khi lấy danh sách người mượn sách",
      error: error.message,
    });
  }
};

export const createDateBorrow = async (req, res) => {
  try {
    const createDateBorrow = await DateBorrows.create({ ...req.body });

    return res.status(201).json({
      message: "Thêm người mượn sách mới thành công",
      data: createDateBorrow,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi dữ liệu khi thêm người mượn sách mới",
      error: error.message,
    });
  }
};

export const getById = async (req, res) => {
  try {
    const getById = await DateBorrows.findById(req.params.id).populate(
      "user_id",
      "name"
    );

    if (!getById)
      return res.status(404).json({
        message: "Không tìm thấy ID người mượn sách phù hợp",
      });

    return res.status(200).json({
      message: "Thông tin chi tiết người mượn sách sách",
      data: getById,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi dữ liệu khi lấy thông tin chi tiết người mượn sách!",
      error: error.message,
    });
  }
};

export const updateDateBorrow = async (req, res) => {
  try {
    const updateDateBorrow = await DateBorrows.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );

    if (!updateDateBorrow)
      return res.status(404).json({
        message: "Không tìm thấy ID người mượn sách cần sửa phù hợp",
      });

    return res.status(200).json({
      message: "Cập nhật thông tin người mượn sách thành công",
      data: updateDateBorrow,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi dữ liệu khi cập nhật thông tin người mượn sách!",
      error: error.message,
    });
  }
};
