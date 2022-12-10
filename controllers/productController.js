import Product from '../models/ProductModel.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public 
const getProducts = async (req, res, next) => {
  const products = await Product.find({});
  res.json(products);
}

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public  
const getProductById = async (req, res, next) => {
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
}

// @desc    Delete Product
// @route   DELETE /api/products/:id
// @access  Private/Admin 
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.remove();
      res.json({ message: "Product removed" })
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch(err) {
    res.status(404);
    const error = new Error("Product not found!");
    next(error);
  }
}

// @desc    Create Product
// @route   POST /api/products
// @access  Private/Admin 
const createProduct = async (req, res, next) => {
  const product = new Product({
    name: "sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "sample category",
    countInStock: 0,
    numReviews: 0,
    description: "sample description"
  });

  const createdProduct = await product.save();

  res.status(201).json(createdProduct);
}

// @desc    Update Product
// @route   PUT /api/products/:id
// @access  Private/Admin 
const updateProduct = async (req, res, next) => {
  const { name, price, description, image, brand, category, countInStock } = req.body;

  const product = await Product.findById(req.params.id);

  if(product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();

    res.status(201).json(updatedProduct);

  } else {
    res.status(404);
    throw new Error("Product Not Found!");
  }
}

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
}
