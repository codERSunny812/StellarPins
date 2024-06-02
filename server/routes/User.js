import express from "express"
import { userModal } from "../models/user.modal.js"
import bcryptjs from "bcryptjs"
import passport from "passport"
import { upload } from "../utils/Multer.config.js"
import { connectCloudinary } from "../utils/Cloudinary.config.js"
import fs from 'fs'

const Router = express.Router()

// route to create a user
Router.post("/register",upload.single('photo'),async (req, res, next) => {
  try {
    console.log("inside the registration route");

    console.log("the pp is start uploading to the cloudinary");
    // uploading the image in the cloudinary
    const cloudinaryLink = await connectCloudinary(req.file.path, {
      transformation: [
        { width: 400, height: 400 },
      ]
    });
    console.log("the pp is succesfully uploaded on the cloudinary");

    // deleting the file from the local
    fs.unlinkSync(req.file.path);
    console.log("the pp is also deleted from the server");

    // taking the name from the front end
    const { userName, email, password, fullName } = req.body;

    console.log("checking the data is coming from the front end");

    if (!userName || !email || !password || !fullName) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    console.log("checking is done");

    console.log("checking for the user already exist");

    const userAlready = await userModal.findOne({ email });

    if (userAlready) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    console.log('hashing the password');

    // hashing the password before saving it into database
    const hashedPassword = await bcryptjs.hash(password, 10);

    console.log("start creating new user");

    // create the user
    const user = await userModal.create({
      userName: userName,
      email: email,
      password: hashedPassword,
      fullName: fullName,
      avtar: cloudinaryLink.secure_url,
    });

    await user.save();

    console.log("new user is created");

    res.status(201).json({ success: true });
  } catch (error) {
    console.log("failed to register the user", error);
    res.status(500).json({ success: false, message: "Failed to register the user" });
  }
});


Router.post("/login",passport.authenticate("local", {
    successRedirect: "/feed", // Change this to your success route
    failureRedirect: "/login",
    failureFlash: true,
  })
)

Router.post("/logout", (req, res, next) => {
req.logOut((error)=>{
  if(error) return  next(error);
  
  res.redirect('/');
})
})

export default Router
