import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const booksSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxLength: [50, "Tên sách chỉ tối đa 50 ký tự!"],
      required: [true, "Tên sách không được để trống!"],
    },

    publish: {
      type: String,
      required: [true, "Ngày xuất bản của sách không được để trống!"],
    },
    price: {
      type: Number,
      required: [true, "Giá sách không được để trống!"],
    },
    discountPrice: {
      type: Number,
    },
    image: {
      type: [String],
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ["1", "2"],
      default: "1",
    },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categories",
    },
    author_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Authors",
    },
  },
  { timestamps: true, versionKey: false }
);

booksSchema.plugin(mongoosePaginate);

const Books = mongoose.model("Books", booksSchema);

export default Books;
