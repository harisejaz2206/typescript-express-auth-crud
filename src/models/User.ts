import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  username: String;
  email: String;
  password: String;
}

const UserSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Hash the password before saving the user model
UserSchema.pre<IUser>("save", async function (next) {
  if (this.isModified("password")) {
    this.password = (await bcrypt.hash(this.password.toString(), 10)) as string;
  }
  next();
});

export default mongoose.model<IUser>("User", UserSchema);
