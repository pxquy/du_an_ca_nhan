import Users from "../Models/users.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const checkEmail = await Users.findOne({ email: req.body.email });
    if (!checkEmail)
      return res.status(400).json({
        message: "Email này đã tồn tại vui lòng thử email khác",
      });

    const hashPassword = await bcrypt.hash(res.body.password, 10);

    const user = await Users.create({ ...req.body, password: hashPassword });
    user.password = undefined;
    return res.status(201).json({
      message: "Đăng ký tài khoản thành công",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi dữu liệu khi đăng ký tài khoản",
      error: error.message,
    });
  }
};

export const signin = async (req, res) => {
  try {
    const checkEmail = await Users.findOne({ email: req.body.email });
    if (checkEmail)
      return res.status(400).json({
        message: "Email này chưa tồn tại vui lòng thử email khác",
      });

    const comparePassword = await bcrypt.compare(
      res.body.password,
      checkEmail.password
    );

    const token = jwt.sign(
      {
        _id: checkEmail._id,
        role: checkEmail.role,
      },
      process.env.SecretKey,
      { expiresIn: "1h" }
    );
    return res.status(201).json({
      message: "Đăng nhập thành công",
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi dữu liệu khi đăng nhập tài khoản",
      error: error.message,
    });
  }
};
