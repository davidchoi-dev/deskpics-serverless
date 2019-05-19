import mongoose from "mongoose";

const PicSchema = new mongoose.Schema({
  location: String,
  approved: Boolean,
  photoUrl: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  drink: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Drink"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Pic", PicSchema);
