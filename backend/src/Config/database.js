import mongoose from "mongoose";

export const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log(`kết nối thành công database ${process.env.DB_URI}`);
  } catch (error) {
    console.log(`lỗi ${error.message}`);
  }
};
