import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
  tableId: { type: String, required: true },
  studentId: { type: String },
  reservationTime: { type: Date },
});

type Reservation = mongoose.InferSchemaType<typeof reservationSchema>;

export default mongoose.model<Reservation>("Reservation", reservationSchema);
