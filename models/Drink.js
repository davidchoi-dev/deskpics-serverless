import mongoose from "mongoose";

const DrinkSchema = new mongoose.Schema({
  name: String,
  photos: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Pic"
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Drink", DrinkSchema);
