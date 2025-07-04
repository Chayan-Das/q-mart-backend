import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const filePath = path.join(process.cwd(), "backend", "data.json");
  const { data } = req.body;

  try {
    const fileData = fs.existsSync(filePath)
      ? JSON.parse(fs.readFileSync(filePath))
      : [];

    fileData.push(data);

    fs.writeFileSync(filePath, JSON.stringify(fileData, null, 2));
    res.status(200).json({ message: "Data saved successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to save data", details: err.message });
  }
}
