import mongoose, { model } from "mongoose";

const { Schema } = mongoose;

const ProductsSchema = new Schema({
  title: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  thumbnail: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  publish_date: { type: String, required: true }
});
export default model("Product", ProductsSchema);
