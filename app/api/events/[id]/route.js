import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Events";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  try {
    await connectDB();
    
    const { id } = params;
    const body = await req.json();
    
    // Validate ObjectId format
    if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
      return NextResponse.json(
        { error: "Invalid event ID" },
        { status: 400 }
      );
    }

    // Find and update the event
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { ...body, date: new Date(body.date) },
      { new: true, runValidators: true }
    );
    
    if (!updatedEvent) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { 
        message: "Event updated successfully",
        event: updatedEvent
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json(
      { error: "Failed to update event", details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    
    const { id } = params;
    
    // Validate ObjectId format
    if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
      return NextResponse.json(
        { error: "Invalid event ID" },
        { status: 400 }
      );
    }

    // Find and delete the event
    const deletedEvent = await Event.findByIdAndDelete(id);
    
    if (!deletedEvent) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { 
        message: "Event deleted successfully",
        deletedEvent: {
          id: deletedEvent._id,
          title: deletedEvent.title,
          venue: deletedEvent.venue
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json(
      { error: "Failed to delete event", details: error.message },
      { status: 500 }
    );
  }
}
