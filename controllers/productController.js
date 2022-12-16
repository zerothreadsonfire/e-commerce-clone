import Product from '../models/productModel.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public 
const getProducts = async (req, res, next) => {
  const keyword = req.query.keyword ? {
    name: {
      $regex: req.query.keyword,
      $options: 'i'
    }
  } : {};

  const products = await Product.find({ ...keyword });
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

// @desc    Create New Review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = async (req, res, next) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if(product) {
    const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString());

    if(alreadyReviewed) {
      res.status(400);
      throw new Error("Product Already Reviewed")
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id
    }

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added"});
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
  createProductReview,
}
