import express from 'express';
import Product from '../models/ProductModel.js';

const router = express.Router();

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public  
router.get('/', async (req, res, next) => {
  const products = await Product.find({});
  res.json(products);
})

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public  
router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch(err) {
    res.status(404);
    const error = new Error("Product not found!");
    next(error);
  }
})

export default router;
