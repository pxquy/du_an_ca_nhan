import Authors from "../Models/authors.model";

export const getAll = async (req, res) => {
  try {
    const authors = await Authors.find();
    if (authors.length == 0)
      return res.status(200).json({
        message: "Hiện tại chưa có tác giả",
        data: [],
      });

    return res.status(200).json({
      message: "Danh sách tác giả:",
      data: authors,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi dữ liệu khi lấy danh sách tác giả",
      error: error.message,
    });
  }
};

export const createAuthor = async (req, res) => {
  try {
    const authorAdd = await Authors.create({ ...req.body });

    const authorCheck = Authors.findOne({ email: req.body.email });

    if (authorCheck)
      return res.status(400).json({
        message: "email này đã tồn tại vui lòng thử email khác!",
      });

    return res.status(201).json({
      message: "Thêm tác giả sách thành công",
      data: authorAdd,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi dữ liệu khi thêm tác giả sách",
      error: error.message,
    });
  }
};

export const getById = async (req, res) => {
  try {
    const author = await Authors.findById(req.params.id);
    if (!author)
      return res.status(404).json({
        message: "Không tìm thấy Id tác giả sách trùng khớp",
      });

    return res.status(200).json({
      message: "Chi tiết tác giả sách",
      data: author,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi khi lấy dữ liệu chi tiết tác giả sách",
      error: error.message,
    });
  }
};

export const updateAuthor = async (req, res) => {
  try {
    const updateAuthor = await Authors.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );

    if (!updateAuthor)
      return res.status(404).json({
        message: "Không tìm thấy tác giả sách cần sửa",
      });

    return res.status(200).json({
      message: "Cập nhật thông tin tác giả sách thành công",
      data: updateAuthor,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi dữ liệu khi cập nhật tác giả sách",
      error: error.message,
    });
  }
};

export const deleteAuthor = async (req, res) => {
  try {
    const authorDelete = await Authors.findByIdAndDelete(req.params.id);
    if (!authorDelete)
      return res.status(404).json({
        message: "Không tìm thấy dữu liệu tác giả sách cần xoá",
      });

    return res.status(200).json({
      message: "Xoá tác giả sách thành công",
      data: authorDelete,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi dữ liệu khi xoá tác giả sách",
      error: error.message,
    });
  }
};
