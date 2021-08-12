import mongoose, { Document } from 'mongoose';
import { customAlphabet } from 'nanoid';
const nanoid = customAlphabet('abcdefghijklmnopqrstuv0987654321', 6);
const { ObjectId } = mongoose.Schema.Types;
export interface ShortURL extends Document {
  shortAddress: string;
  destination: string;
  createdAt: Date;
  owner: mongoose.Schema.Types.ObjectId;
  clicks: number;
}

const schema = new mongoose.Schema({
  shortAddress: {
    type: String,
    unique: true,
    required: true,

    default: () => nanoid(),
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
  createdAt: { type: Date, default: Date.now },
  destination: { type: String, required: false },
  owner: {
    type: ObjectId,
    ref: 'User',
  },
});

const ShortUrl = mongoose.model<ShortURL>('ShortUrl', schema);

export default ShortUrl;
