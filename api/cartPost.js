import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const filePath = path.join(process.cwd(), "backend", "data.json");
  const { productId, name, price, quantity, inStock } = req.body;

  // Basic validation:
  if (
    typeof productId !== "number" ||
    typeof name !== "string" ||
    typeof price !== "number" ||
    typeof quantity !== "number" ||
    typeof inStock !== "boolean"
  ) {
    return res.status(400).json({ error: "Invalid product data" });
  }

  try {
    let fileData = [];

    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      fileData = fileContent ? JSON.parse(fileContent) : [];
    }

    // Check if product already in cart:
    const existingIndex = fileData.findIndex(
      (item) => item.productId === productId
    );

    if (existingIndex !== -1) {
      // Update quantity
      fileData[existingIndex].quantity += quantity;
    } else {
      // Add new product
      fileData.push({ productId, name, price, quantity, inStock });
    }

    fs.writeFileSync(filePath, JSON.stringify(fileData, null, 2));

    return res.status(200).json({ message: "Cart updated successfully", cart: fileData });
  } catch (err) {
    return res.status(500).json({ error: "Failed to save data", details: err.message });
  }
}
