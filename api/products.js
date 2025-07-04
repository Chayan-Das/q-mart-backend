import { readFileSync } from 'fs';
import { join } from 'path';

export default function handler(req, res) {
  const filePath = join(process.cwd(), 'backend', 'products.json');

  try {
    const data = readFileSync(filePath, 'utf-8');
    const products = JSON.parse(data);
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: "Unable to read data", details: err.message });
  }
}
