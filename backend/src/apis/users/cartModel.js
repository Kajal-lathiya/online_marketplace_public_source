import mongoose, { model } from "mongoose";

const { Schema } = mongoose;

const CartSchema = new Schema(
  {
    userId: { type: String, required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: Number, required: true },
    image_src: { type: String, required: true },
    book_detail_src: { type: String, required: false },
    isbn_13: { type: String, required: true },
    publisher: { type: String, required: true },
    publish_date: { type: String, required: true },
    quantity: { type: Number, required: true }
  },
  { timestamps: true }
);

export default model("cart", CartSchema);
