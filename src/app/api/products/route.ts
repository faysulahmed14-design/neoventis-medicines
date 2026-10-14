import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";
import { products as initialProducts } from "@/app/data/products";

// GET: Fetch all products (or seed if empty)
export async function GET() {
  try {
    await connectToDatabase();

    let products = await Product.find({}).sort({ createdAt: -1 }).lean();

    // If database is empty, seed initial products
    if (!products || products.length === 0) {
      await Product.insertMany(initialProducts);
      products = await Product.find({}).sort({ createdAt: -1 }).lean();
    }

    return NextResponse.json({ success: true, count: products.length, data: products });
  } catch (error: any) {
    console.error("Failed to fetch products:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// POST: Add new product
export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const { name, category, price, stock, description } = body;

    if (!name || price === undefined || stock === undefined) {
      return NextResponse.json(
        { success: false, error: "Name, price, and stock are required." },
        { status: 400 }
      );
    }

    // Check if exists
    const existing = await Product.findOne({ name: name.trim() });
    if (existing) {
      return NextResponse.json(
        { success: false, error: "Product with this name already exists." },
        { status: 409 }
      );
    }

    const newProduct = await Product.create({
      name: name.trim(),
      category: category?.trim() || "Medicine",
      price: Number(price),
      stock: Number(stock),
      description: description?.trim() || "Authentic medicine batch with verified quality control.",
    });

    return NextResponse.json({ success: true, data: newProduct }, { status: 201 });
  } catch (error: any) {
    console.error("Failed to create product:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create product" },
      { status: 500 }
    );
  }
}

// PUT: Update an existing product
export async function PUT(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { name, price, stock, category } = body;

    if (!name) {
      return NextResponse.json(
        { success: false, error: "Product name is required for update." },
        { status: 400 }
      );
    }

    const updated = await Product.findOneAndUpdate(
      { name: name.trim() },
      {
        ...(price !== undefined && { price: Number(price) }),
        ...(stock !== undefined && { stock: Number(stock) }),
        ...(category && { category: category.trim() }),
      },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Product not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    console.error("Failed to update product:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update product" },
      { status: 500 }
    );
  }
}

// DELETE: Remove product
export async function DELETE(req: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name");

    if (!name) {
      return NextResponse.json(
        { success: false, error: "Product name parameter is required." },
        { status: 400 }
      );
    }

    const deleted = await Product.findOneAndDelete({ name });
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Product not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: `Product ${name} deleted successfully.` });
  } catch (error: any) {
    console.error("Failed to delete product:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete product" },
      { status: 500 }
    );
  }
}
