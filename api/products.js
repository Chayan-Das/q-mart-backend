import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), "backend", "products.json");

  try {
    const fileContents = fs.readFileSync(filePath, "utf-8");
    const products = JSON.parse(fileContents);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      error: "Unable to read product data",
      details: error.message,
    });
  }
}
