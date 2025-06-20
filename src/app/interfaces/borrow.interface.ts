import mongoose, { mongo } from "mongoose";

export interface IBorrow {
  book: mongoose.ObjectId;
  quantity: number;
  dueDate: Date;
}
