import express from "express";
import Product from "../models/product.model.js";

import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getProducts);

//get Single Product
router.get("/:id", getProduct);

//create or add data
router.post("/", createProduct);

//update a prodcut
router.put("/:id", updateProduct);

//delete a product
router.put(":/id", deleteProduct);

export default router;
