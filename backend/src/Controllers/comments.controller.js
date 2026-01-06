import Comments from "../Models/comments.model";
import Users from "../Models/users.model";

export const getAll = async (req, res) => {
  const options = {
    populate: { path: "user_id", select: "name" },
  };
  try {
    const comments = await Comments.paginate({}, options);

    if (comments.length == 0)
      return res.status(200).json({
        message: "Hiện không có bình luận nào",
        data: [],
      });

    return res.status(200).json({
      message: "Danh sách tất cả bình luận",
      data: comments,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi dữ liệu khi lấy danh sách bình luận!",
      error: error.message,
    });
  }
};

export const createComment = async (req, res) => {
  try {
    const user = await Users.findOne({ _id: req.user._id });

    if (!user)
      res.status(403).json({
        message: "Bạn cần đăng nhập vào để có thể bình luận",
      });

    const createComment = await Comments.create({ ...req.body, user_id: user });

    return res.status(201).json({
      message: "Bình luận thành công",
      data: createComment,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi dữ liệu khi bình luận!",
      error: error.message,
    });
  }
};

export const getById = async (req, res) => {
  try {
    const comment = await Comments.findById(req.params.id)
      .populate("user_id", "name")
      .populate("book_id", "name");

    if (!comment)
      return res.status(404).json({
        message: "Không tìm thấy ID bình luận cần lấy",
      });

    return res.status(200).json({
      message: "Thông tim chi tiết sản phẩm cần lấy",
      data: comment,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi dữ liệu khi lấy chi tiết bình luận!",
      error: error.message,
    });
  }
};

export const updateComment = async (req, res) => {
  try {
    const updateComment = await Comments.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    )
      .populate("user_id", "name")
      .populate("book_id", "name");

    if (!updateComment)
      return res.status(404).json({
        message: "Không tìm thấu đữ liệu bình luận cần cập nhật!",
      });
    return res.status(200).json({
      message: "Cập nhật bình luận thành công",
      data: updateComment,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi dữ liệu khi cập nhật bình luận!",
      error: error.message,
    });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const deleteComment = await Comments.findByIdAndDelete(req.params.id);

    if (!deleteComment)
      return res.status(404).json({
        message: "Không tìm thấy ID bình luận cần xoá!",
      });

    return res.status(200).json({
      message: "Xoá bình luận thành công",
      data: deleteComment,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi dữ liệu khi xoá bình luận!",
      error: error.message,
    });
  }
};
