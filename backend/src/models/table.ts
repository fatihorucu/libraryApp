import mongoose from "mongoose";

const tableSchema = new mongoose.Schema({
  category: { type: String, required: true, unique: true },
  numberOfChairs: { type: Number, required: true },
  numberOfRows: { type: Number, required: true },
});

type Table = mongoose.InferSchemaType<typeof tableSchema>;

export default mongoose.model<Table>("Table", tableSchema);
