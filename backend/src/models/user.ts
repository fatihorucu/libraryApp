import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  studentNum: { type: Number, required: true, unique: true, select: false },
  birthday: { type: String, required: true },
  phoneNumber: { type: Number, unique: true },
  password: { type: String, required: true, select: false }, // select:false is for not including secret data in the response upon http requests
});

type User = mongoose.InferSchemaType<typeof UserSchema>;

module.exports = mongoose.model("User", UserSchema);

export default mongoose.model<User>("User", UserSchema);
