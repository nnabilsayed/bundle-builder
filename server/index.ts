import express from 'express';
import cors from 'cors';
import { products } from '../src/data/products';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get('/api/products', (_req, res) => {
  res.json(products);
});

app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
});
