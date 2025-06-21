import mongoose, { Schema, model } from "mongoose";
import { IBorrow } from "../interfaces/borrow.interface";
const borrowSchema = new Schema<IBorrow>(
  {
    book: {
      type: mongoose.Types.ObjectId,
      ref: "book",
    },
    quantity: {
      type: Number,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);



const Borrow = model<IBorrow>("Borrow", borrowSchema);

export default Borrow;
