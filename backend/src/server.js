import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import products from '../data/products.js';
import connectDB from '../config/db.js';
import productRoutes from '../routes/productRoutes.js';

const app = express();
dotenv.config();

connectDB();

app.use(cors());
app.use("/api/products", productRoutes);

app.get('/', (req, res) => {
  res.send('welcome to backend!');
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});