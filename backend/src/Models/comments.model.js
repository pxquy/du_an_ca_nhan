import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const commentsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Tiêu đề bình luận không được để trống!"],
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "Không được để trống ID người dùng!"],
    },
    book_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Books",
      required: [true, "Không được để trống ID sách!"],
    },
    content: {
      type: String,
      required: [true, "Nội dung bình luận không được trống"],
    },
    star: {
      type: Number,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

commentsSchema.plugin(mongoosePaginate);

const Comments = mongoose.model("Comments", commentsSchema);

export default Comments;
