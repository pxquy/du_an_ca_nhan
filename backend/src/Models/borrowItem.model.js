import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const borrowItemSchema = new mongoose.Schema(
  {
    book_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Books",
      required: [true],
    },
    dateBorrow_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DateBorrows",
      required: [true],
    },
    description: {
      type: String,
    },
    quantity: {
      type: Number,
      required: [true, "Số lượng không được để trống"],
      min: [1, "Số lượng phải >= 1"],
    },
    totalPrice: {
      type: Number,
      required: [true, "Giá tiền mượn không được để trống"],
    },
    status: {
      type: String,
      enum: ["1", "2", "3"],
      default: "1",
    },
  },
  { timestamps: true, versionKey: false }
);

borrowItemSchema.plugin(mongoosePaginate);

const BorrowItems = mongoose.model("BorrowItems", borrowItemSchema);

export default BorrowItems;
