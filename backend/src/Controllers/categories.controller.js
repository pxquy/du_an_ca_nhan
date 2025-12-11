import Categories from "../Models/categories.model";

export const getAll = async (req, res) => {
  try {
    const categories = await Categories.find();
    if (categories.length == 0)
      return res.status(200).json({
        message: "Hiện tại chưa có thể loại sách nào",
        data: [],
      });

    return res.status(200).json({
      message: "Danh sách thể loại sách:",
      data: categories,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi dữ liệu khi lấy danh mục thể loại sách",
      error: error.message,
    });
  }
};

export const createCategory = async (req, res) => {
  try {
    const categoryAdd = await Categories.create({ ...req.body });

    return res.status(201).json({
      message: "Thêm thể loại sách thành công",
      data: categoryAdd,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi dữ liệu khi thêm thể loại sách",
      error: error.message,
    });
  }
};

export const getById = async (req, res) => {
  try {
    const category = await Categories.findById(req.params.id);
    if (!category)
      return res.status(404).json({
        message: "Không tìm thấy Id thể loại sách trùng khớp",
      });

    return res.status(200).json({
      message: "Chi tiết thể loại sách",
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi khi lấy dữ liệu chi tiết thể loại sách",
      error: error.message,
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const updateCategory = await Categories.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );

    if (!updateCategory)
      return res.status(404).json({
        message: "Không tìm thấy thể loại sách cần sửa",
      });

    return res.status(200).json({
      message: "Sửa thông tin thể loại sách thành công",
      data: updateCategory,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi dữ liệu khi cập nhật thể loại sách",
      error: error.message,
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const categoryDelete = await Categories.findByIdAndDelete(req.params.id);
    if (!categoryDelete)
      return res.status(404).json({
        message: "Không tìm thấy dữu liệu thể loại sách cần xoá",
      });

    return res.status(200).json({
      message: "Xoá thể loại sách thành công",
      data: categoryDelete,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi dữ liệu khi xoá thể loại sách",
      error: error.message,
    });
  }
};
