import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  name: String;
  email: String;
  password: String;
  salt: String;
  created: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}
const schema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  salt: String,
  created: {
    type: Date,
    default: Date.now,
  },
});
schema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
    console.log(this.email);
  } catch (err) {
    next(err);
  }
});

schema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (err) {
    throw err;
  }
};
const User = mongoose.model<IUser>('User', schema);

export default User;
