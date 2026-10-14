import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Order from "@/models/Order";
import Product from "@/models/Product";

// GET: Fetch orders (support optional orderId or phone filter for tracking)
export async function GET(req: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get("orderId");
    const phone = searchParams.get("phone");

    const query: any = {};
    if (orderId) {
      query.orderId = orderId.trim();
    }
    if (phone) {
      query["customer.phone"] = phone.trim();
    }

    const orders = await Order.find(query).sort({ createdAt: -1 }).lean();

    return NextResponse.json({ success: true, count: orders.length, data: orders });
  } catch (error: any) {
    console.error("Failed to fetch orders:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

// POST: Place a new order & deduct stock
export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const { orderId, customer, items, totalAmount, paymentMethod } = body;

    if (!customer?.name || !customer?.phone || !customer?.address) {
      return NextResponse.json(
        { success: false, error: "Customer name, phone, and address are required." },
        { status: 400 }
      );
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: "At least one item is required in the order." },
        { status: 400 }
      );
    }

    const generatedId = orderId || "ORD-" + Math.floor(100000 + Math.random() * 900000);

    const newOrder = await Order.create({
      orderId: generatedId,
      customer: {
        name: customer.name.trim(),
        phone: customer.phone.trim(),
        address: customer.address.trim(),
        email: customer.email?.trim() || "",
      },
      items: items.map((item: any) => ({
        name: item.name,
        category: item.category || "Medicine",
        price: Number(item.price) || 0,
        quantity: Number(item.quantity) || 1,
      })),
      totalAmount: Number(totalAmount) || 0,
      paymentMethod: paymentMethod || "cod",
      status: "Processing",
    });

    // Deduct stock for each ordered item
    for (const item of items) {
      try {
        await Product.findOneAndUpdate(
          { name: item.name },
          { $inc: { stock: -(Number(item.quantity) || 1) } }
        );
      } catch (err) {
        console.warn(`Could not deduct stock for ${item.name}:`, err);
      }
    }

    return NextResponse.json({ success: true, data: newOrder }, { status: 201 });
  } catch (error: any) {
    console.error("Failed to create order:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create order" },
      { status: 500 }
    );
  }
}

// PUT: Update order status
export async function PUT(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { orderId, status } = body;

    if (!orderId || !status) {
      return NextResponse.json(
        { success: false, error: "Order ID and new status are required." },
        { status: 400 }
      );
    }

    const updated = await Order.findOneAndUpdate(
      { orderId: orderId.trim() },
      { status },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Order not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    console.error("Failed to update order:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update order" },
      { status: 500 }
    );
  }
}
