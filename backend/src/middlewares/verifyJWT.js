import jwt from "jsonwebtoken";

export const verifyIWT = (...roles) => {
  return async (req, res, next) => {
    try {
      const token = req.cookies.token;

      if (!token)
        return res.status(400).json({
          message: "Không tồn tại token hoặc token hết hạn",
        });

      const decode = jwt.verify(token, process.env.SecretKey);

      req.user = decode;

      if (!roles.includes(req.user.role))
        return res.status(400).json({
          message: "Bạn không có quyền",
        });

      next();
    } catch (error) {
      return res.status(500).json({
        message: "Lỗi dữu liệu khi lấy token",
        error: error.message,
      });
    }
  };
};
