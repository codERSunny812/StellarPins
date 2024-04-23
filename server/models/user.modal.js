import mongoose from "mongoose"
import plm from 'passport-local-mongoose'
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


userSchema.plugin(plm)

export const UserModal = mongoose.model("UserModal", userSchema)
