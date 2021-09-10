import express from 'express';
import cors from 'cors';
import products from '../data/products.js';

const app = express();
const PORT = 5000;

app.use(cors());

app.get('/', (req, res) => {
  res.send('welcome to backend!');
})

app.get('/api/products', (req, res) => {
  res.json(products);
})

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p._id === req.params.id);
  res.json(product);
})

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});