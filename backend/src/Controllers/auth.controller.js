import Users from "../Models/users.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const checkEmail = await Users.findOne({ email: req.body.email });

    if (checkEmail)
      return res.status(400).json({
        message: "Email này đã tồn tại vui lòng thử email khác",
      });

    const hashPassword = await bcrypt.hash(req.body.password, 10);

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
    if (!checkEmail)
      return res.status(400).json({
        message: "Email này chưa tồn tại vui lòng thử email khác",
      });

    const comparePassword = await bcrypt.compare(
      req.body.password,
      checkEmail.password
    );

    const token = jwt.sign(
      {
        _id: checkEmail._id,
        role: checkEmail.roles,
      },
      process.env.SecretKey,
      { expiresIn: "1h" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
      path: "/",
    });
    return res.status(201).json({
      message: "Đăng nhập thành công",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi dữu liệu khi đăng nhập tài khoản",
      error: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    });

    return res.status(200).json("Đăng Xuất thành công!");
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi dữu liệu khi đăng xuất tài khoản",
      error: error.message,
    });
  }
};
