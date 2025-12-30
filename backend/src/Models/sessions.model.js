import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      index: true,
    },
    refreshToken: {
      type: String,
      required: true,
      unique: true,
    },
    expires: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
sessionSchema.index({ expires: 1 }, { expireAfterSeconds: 0 });
const Sessions = mongoose.model("Sessions", sessionSchema);

export default Sessions;
