import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String },
  surname: { type: String },
  studentNum: { type: String, required: true },
  birthday: { type: String },
  phoneNumber: { type: String },
  password: { type: String, required: true },
});

type User = mongoose.InferSchemaType<typeof userSchema>;

export default mongoose.model<User>("User", userSchema);
