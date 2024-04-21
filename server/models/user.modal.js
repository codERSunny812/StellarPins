import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    avtar: {
      type: String,
    },
    post: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "postModal ",
      },
    ],
  },
  { 
    timestamps: true
   }
)

export const UserModal = mongoose.model("UserModal", userSchema)
