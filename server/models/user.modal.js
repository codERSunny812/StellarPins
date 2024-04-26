import mongoose from "mongoose"

export const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
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
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "postModal",
      },
    ],
  },
  {
    timestamps: true,
  }
)



export const userModal = mongoose.model("userModal", userSchema);












// named and default import and export 

// Export Statements:
// export default function Button() { } // default export
// export function Button() { } // named export

// Import Statements:
// import Button from './button.js'; // default export
// import { Button } from './button.js'; // Named export