import mongoose from "mongoose"

export const postSchema = new mongoose.Schema(
  {
    caption: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    likes: {
      type: Array,
      default: [],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModal",
    },
  },
  {
    timestamps: true,
  }
)

export const postModal = mongoose.model("postModal", postSchema)
