import express from "express";
import CartModel from "./model.js";
import createHttpError from "http-errors";

const cartRouter = express.Router();

cartRouter.post("/", async (req, res, next) => {
  try {
      const addtoCart = new CartModel(req.body);
      console.log('addtoCart-->', addtoCart);
    const { _id } = await addtoCart.save();
    res.status(201).send({ id: _id });
  } catch (error) {
    next(error);
  }
});

// cartRouter.put("/:id", async (req, res, next) => {
//   try {
//     const updatedProduct = await CartModel.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true, runValidators: true }
//     );
//     if (updatedProduct) res.status(200).send(updatedProduct);
//     else
//       next(createHttpError(404, `Product with id ${req.params.id} not found!`));
//   } catch (error) {
//     next(error);
//   }
// });

// cartRouter.delete("/:id", async (req, res, next) => {
//   try {
//     const deleteProduct = await ProductsModel.findByIdAndDelete(req.params.id);
//     if (deleteProduct) res.status(204).send();
//     else
//       next(createHttpError(404, `Product with id ${req.params.id} not found!`));
//   } catch (error) {
//     next(error);
//   }
// });

export default cartRouter;
