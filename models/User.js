import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  profilePhoto: String,
  email: {
    type: String,
    unique: true
  },
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

export default mongoose.model("User", UserSchema);
