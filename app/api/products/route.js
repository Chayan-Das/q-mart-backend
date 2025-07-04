import { NextResponse } from "next/server";
import products from "../../../backend/products.json";

export async function GET() {
  return NextResponse.json(products);
}
