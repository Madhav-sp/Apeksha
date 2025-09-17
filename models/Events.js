import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    venue: {
      type: String,
      required: true,
    },
    image: {
      type: String, // store image URL or Cloudinary link
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Event || mongoose.model("Event", EventSchema);
