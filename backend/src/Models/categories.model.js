import mongoose from "mongoose";

const categoriesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Tên thể loại sách bắt buộc nhập!"],
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Categories = mongoose.model("Categories", categoriesSchema);

export default Categories;
