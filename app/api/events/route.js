import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Events";

// GET all events
export async function GET() {
  try {
    await connectDB();
    const events = await Event.find().sort({ date: 1 }); // upcoming first
    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    console.error("GET events error:", error);
    // Return empty array if MongoDB is not available
    return NextResponse.json([], { status: 200 });
  }
}

// POST new event
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    
    // Validate required fields
    if (!body.title || !body.description || !body.venue || !body.image) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newEvent = await Event.create(body);
    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json(
      { error: "Failed to create event", details: error.message },
      { status: 500 }
    );
  }
}
