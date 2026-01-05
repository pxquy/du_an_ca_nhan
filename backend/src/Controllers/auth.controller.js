import Users from "../Models/users.model";
import Sessions from "../Models/sessions.model";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Session } from "inspector/promises";

const REFRESH_DATE = 14 * 24 * 60 * 60 * 1000;

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
    const { email, password } = req.body;
    const checkEmail = await Users.findOne({ email });
    if (!checkEmail)
      return res.status(400).json({
        message: "Email này chưa tồn tại vui lòng thử email khác",
      });

    const comparePassword = await bcrypt.compare(password, checkEmail.password);

    if (!comparePassword)
      res.status(404).json({
        message: "Sai mật khẩu khi đăng nhập!",
      });

    const token = jwt.sign(
      {
        _id: checkEmail._id,
        role: checkEmail.roles,
      },
      process.env.SecretKey,
      { expiresIn: "15m" }
    );

    const refreshToken = crypto.randomBytes(64).toString("hex");

    await Sessions.create({
      user_id: checkEmail._id,
      refreshToken,
      expires: new Date(Date.now() + REFRESH_DATE),
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
      path: "/",
    });
    return res.status(201).json({
      message: "Đăng nhập thành công",
      token,
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
    const token = req.cookies?.refreshToken;
    console.log(token);
    if (token) {
      await Sessions.deleteOne({ refreshToken: token });
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
      });
    }
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi dữu liệu khi đăng xuất tài khoản",
      error: error.message,
    });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const checkToken = req.cookies?.refreshToken;
    if (!checkToken)
      return res.status(403).json({
        message: "Không tìm thấy token yêu cầu đăng nhập lại!",
      });

    const session = await Sessions.findOne({ refreshToken: checkToken });

    if (!session)
      return res.status(403).json({
        message: "Không tìm thấy session hợp lệ!",
      });

    if (session.expires < Date.now) return;
    res.status(403).json({
      message: "Token đã hết hạn!",
    });

    const user = await Users.findById({ _id: session.user_id }).select("roles");
    const token = jwt.sign(
      { _id: user._id, role: user.roles },
      process.env.SecretKey,
      {
        expiresIn: "15m",
      }
    );

    return res.status(200).json(token);
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi dữu liệu khi yêu cầu lại token!",
      error: error.message,
    });
  }
};
