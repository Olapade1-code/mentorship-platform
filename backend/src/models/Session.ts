import mongoose, { Schema, Document } from "mongoose";

export interface ISession extends Document {
  mentor: mongoose.Types.ObjectId;
  mentee: mongoose.Types.ObjectId;
  date: Date;
  feedbackMentee?: string;
  ratingMentee?: number;
  feedbackMentor?: string;
}

const SessionSchema = new Schema<ISession>({
  mentor: { type: Schema.Types.ObjectId, ref: "User", required: true },
  mentee: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  feedbackMentee: String,
  ratingMentee: Number,
  feedbackMentor: String,
});

export default mongoose.model<ISession>("Session", SessionSchema);
