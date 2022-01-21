import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import products from './data/products.js';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

connectDB();

app.use(cors());

app.get('/', (req, res) => {
  res.send('welcome to backend!');
})

app.use("/api/products", productRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});