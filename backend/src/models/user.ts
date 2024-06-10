import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  studentNum: { type: String, required: true, unique: true, select: false },
  birthday: { type: Date, required: true },
  phoneNumber: { type: String, unique: true },
  password: { type: String, required: true, select: false }, // select:false is for not including secret data in the response upon http requests
});

type User = mongoose.InferSchemaType<typeof UserSchema>;

module.exports = mongoose.model("User", UserSchema);

export default mongoose.model<User>("User", UserSchema);
