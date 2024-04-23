import express from "express"
import { postModal } from "../models/post.modal.js"
import { UserModal } from "../models/user.modal.js"
import { upload } from "../utils/Multer.config.js"

const Router = express.Router()

// route to create a  post
Router.post("/upload", upload.single("file"), async (req, res) => {
   try {

      if (!req.file) return res.status(404).send("no file found");

      const userId = req.session.passport.user;
      const user = await UserModal.findById(userId);

      if (!user) {
         return res.status(404).send("User not found");
      }

      const newPost = await postModal.create({
         caption: req.body.caption,
         imageUrl: req.file.filename,
         user: userId
      });

      // Update user's posts array
      user.posts.push(newPost._id);
      await user.save();

      res.send("Post created successfully");
   
   } catch (error) {

      console.error("Error creating post:", error);
      res.status(500).send("Internal Server Error");
      
   }
 


})

export default Router
