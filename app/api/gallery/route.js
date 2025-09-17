import { connectDB } from "@/lib/mongodb"; // ✅ not dbConnect
import Gallery from "@/models/Gallery";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    // Validate required fields
    if (!body.title || !body.category || !body.src || !body.driveLink) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newItem = new Gallery(body);
    await newItem.save();

    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json(
      { error: "Failed to create gallery item", details: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const items = await Gallery.find({});
    return NextResponse.json(items, { status: 200 });
  } catch (error) {
    console.error("GET Error:", error);
    // Return empty array if MongoDB is not available
    return NextResponse.json([], { status: 200 });
  }
}
