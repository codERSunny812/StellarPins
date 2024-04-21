import mongoose from "mongoose"

const postSchema = new mongoose.Schema(
  {
    caption: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    likes: {
      type: Array,
      default: [],
    },
    user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'UserModal'
    }
  },
  { 
    timestamps: true
   }
)

export const postModal = mongoose.model("postModal", postSchema)
