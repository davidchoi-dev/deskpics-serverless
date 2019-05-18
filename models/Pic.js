import mongoose from "mongoose";

const PicSchema = new mongoose.Schema({
  location: String,
  approved: Boolean,
  photoUrl: String,
  drink: {
    type: mongoose.Types.ObjectId,
    ref: "Drink"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Pic", PicSchema);
