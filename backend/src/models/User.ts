import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  role: "admin" | "mentor" | "mentee";
  name: string;
  bio?: string;
  skills?: string[];
  goals?: string;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "mentor", "mentee"], default: "mentee" },
  name: { type: String, required: true },
  bio: String,
  skills: [String],
  goals: String,
});

export default mongoose.model<IUser>("User", UserSchema);
