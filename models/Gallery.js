import mongoose from "mongoose";

const GallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    src: {
      type: String,
      required: true, // cover image URL
    },
    driveLink: {
      type: String,
      required: true, // Google Drive link
    },
  },
  { timestamps: true }
);

export default mongoose.models.Gallery ||
  mongoose.model("Gallery", GallerySchema);
