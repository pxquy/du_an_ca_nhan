import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Tên không được bỏ trống!"],
    },
    email: {
      type: String,
      required: [true, "email không được bỏ trống!"],
    },
    password: {
      type: String,
      required: [true, "Mật khẩu không được bỏ trống!"],
    },
    birthday: {
      type: String,
    },
    numberPhone: {
      type: String,
      required: [true, "số điện thoại không được bỏ trống!"],
    },
    address: {
      type: String,
    },
    image: {
      type: [String],
    },
    gender: {
      type: String,
      enum: ["1", "2"],
      default: "1",
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ["1", "2"],
      default: "1",
    },
    roles: {
      type: String,
      enum: ["0", "1"],
      default: "1",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

UserSchema.plugin(mongoosePaginate);

const Users = mongoose.model("Users", UserSchema);

export default Users;
