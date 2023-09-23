import mongoose, { Document, Model, Schema } from 'mongoose';

// Defining the User interface to represent a user document
interface IUser extends Document {
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

// Creating a Mongoose schema for the User
const userSchema: Schema<IUser> = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export default User;
