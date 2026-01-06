import Users from "../Models/users.model";

export const getAll = async (req, res) => {
  try {
    const users = await Users.paginate({});
    if (!users.length == 0)
      return res.status(200).json({
        message: "Hiện chưa có người dùng nào trong thư viện",
        data: [],
      });

    return res.status(200).json({
      message: "Danh sách người dùng",
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi dữu liệu khi lấy danh sách người dùng!",
      error: error.message,
    });
  }
};

export const information = async (req, res) => {
  try {
    const user = await Users.findOne({ _id: req.user._id });

    return res.status(200).json({
      message: "Chi tiết tài khoản",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lấy dữ liệu thông tin người dùng lỗi!",
      error: error.message,
    });
  }
};

export const lockUser = async (req, res) => {
  try {
    const lockUser = await Users.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      {
        new: true,
      }
    );

    if (!lockUser)
      res.status(404).json({
        message: "Không tìm thấy ID người dùng muốn khoá!",
      });

    return res.status(200).json({
      message: "Khoá người dùng thành công",
      data: lockUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Khoá người dùng lỗi!",
      error: error.message,
    });
  }
};
