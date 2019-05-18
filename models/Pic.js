import mongoose from "mongoose";

const PicSchema = new mongoose.Schema({
  location: String,
  approved: Boolean,
  photoUrl: String
});

export default mongoose.model("Pic", PicSchema);
