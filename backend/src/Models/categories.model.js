import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

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

categoriesSchema.plugin(mongoosePaginate);

const Categories = mongoose.model("Categories", categoriesSchema);

export default Categories;
