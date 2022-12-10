import express from 'express';
import { protect, admin } from "../middleware/authMiddleware.js";
import { getProducts, getProductById, deleteProduct, createProduct, updateProduct } from "../controllers/productController.js"

const router = express.Router();

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route("/:id").get(getProductById).put(protect, admin, updateProduct).delete(protect, admin, deleteProduct);

export default router;
