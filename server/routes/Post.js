import express from "express"
import { postModal } from "../models/post.modal.js"
import { userModal } from "../models/user.modal.js"
import { upload } from "../utils/Multer.config.js"
import { connectCloudinary } from "../utils/Cloudinary.config.js"
import fs from 'fs/promises'

const Router = express.Router();

// route to create a  post
Router.post("/upload",upload.single("file"), async (req, res) => {
  try {

    if (!req.file) return res.status(404).send("no file found");

    // start  measuring the time 
    console.time("upload time");

    console.log(req)

    console.log(req.file)
    
    // storing image  on the cloud
    const cloudLink = await connectCloudinary(req.file.path,{
      transformation: [
        { width: 300, height: 300, crop: "fill" },
        { radius: "max" }
      ]
    });


    await fs.unlink(req.file.path);


    const userId = req.session.passport.user

    const user = await userModal.findById(userId)

    if (!user) {
      return res.status(404).send("User not found");
    }

    const newPost = await postModal.create({
      caption: req?.body?.caption,
      imageUrl: cloudLink?.secure_url,
      user: userId,
    })

    // Update user's posts array
    user.posts.push(newPost._id)

    await user.save()

    console.log("post created succesfully")

    console.timeEnd("Upload Time"); // End measuring time taken


    res.redirect('/profile?upload=success');

  }
  catch (error) {
    console.error("Error creating post:", error)
    res.status(500).send("Internal Server Error")
  }
})

export default Router;
