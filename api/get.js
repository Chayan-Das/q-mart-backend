import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), "backend", "data.json");

  try {
    const data = fs.readFileSync(filePath);
    res.status(200).json(JSON.parse(data));
  } catch (err) {
    res.status(500).json({ error: "Unable to read data", details: err.message });
  }
}
