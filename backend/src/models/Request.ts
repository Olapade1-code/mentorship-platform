import mongoose, { Schema, Document } from "mongoose";

export interface IRequest extends Document {
  mentee: mongoose.Types.ObjectId;
  mentor: mongoose.Types.ObjectId;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
}

const RequestSchema = new Schema<IRequest>({
  mentee: { type: Schema.Types.ObjectId, ref: "User", required: true },
  mentor: { type: Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, enum: ["PENDING", "ACCEPTED", "REJECTED"], default: "PENDING" },
});

export default mongoose.model<IRequest>("Request", RequestSchema);
