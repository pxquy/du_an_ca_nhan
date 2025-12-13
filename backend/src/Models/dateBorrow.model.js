import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const dateBorrowSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    borrow_date: {
      type: String,
      required: [true, "Ngày mượn không được bỏ trống!"],
    },
    return_date: {
      type: String,
      required: [true, "Ngày trả không được bỏ trống!"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

dateBorrowSchema.plugin(mongoosePaginate);

const DateBorrows = mongoose.model("DateBorrows", dateBorrowSchema);

export default DateBorrows;
