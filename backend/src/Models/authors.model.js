import mongoose from "mongoose";

const authorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxLength: [50, "Tối đa 50 ký tự"],
      required: [true, "Tên tác giả sách ko được để trống"],
    },
    email: {
      type: String,
      unique: true,
    },
    birthday: {
      type: String,
    },
    numberPhone: {
      type: String,
      maxLength: [11, "Số điên thoại tối đa 11 ký tự"],
      required: [true, "Số điện thoại sinh tác giả không được để trống!"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Authors = mongoose.model("Authors", authorSchema);

export default Authors;
