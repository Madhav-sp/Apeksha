import { connectDB } from "@/lib/mongodb";
import Gallery from "@/models/Gallery";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  try {
    await connectDB();
    
    const { id } = params;
    const body = await req.json();
    
    // Validate ObjectId format
    if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
      return NextResponse.json(
        { error: "Invalid gallery item ID" },
        { status: 400 }
      );
    }

    // Find and update the gallery item
    const updatedItem = await Gallery.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    );
    
    if (!updatedItem) {
      return NextResponse.json(
        { error: "Gallery item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { 
        message: "Gallery item updated successfully",
        item: updatedItem
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json(
      { error: "Failed to update gallery item", details: error.message },
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
        { error: "Invalid gallery item ID" },
        { status: 400 }
      );
    }

    // Find and delete the gallery item
    const deletedItem = await Gallery.findByIdAndDelete(id);
    
    if (!deletedItem) {
      return NextResponse.json(
        { error: "Gallery item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { 
        message: "Gallery item deleted successfully",
        deletedItem: {
          id: deletedItem._id,
          title: deletedItem.title,
          category: deletedItem.category
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json(
      { error: "Failed to delete gallery item", details: error.message },
      { status: 500 }
    );
  }
}
