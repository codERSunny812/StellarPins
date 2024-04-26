import express from "express"
import { userModal } from "../models/user.modal.js"
import bcryptjs from "bcryptjs"
import passport from "passport"
import { upload } from "../utils/Multer.config.js"
import { connectCloudinary } from "../utils/Cloudinary.config.js"
import fs from 'fs'

const Router = express.Router()

// route to create a user
Router.post("/register", upload.single('photo') ,async (req, res, next) => {

try {


  // uploading the image in the cloudinary
  const cloudinaryLink = await connectCloudinary(req.file.path, {
    transformation: [
      { width: 300, height: 300, crop: "fill" },
      { radius: "max" }

    ]
  });

  // deleting the file from the local
  fs.unlinkSync(req.file.path);

   
  const { userName, email, password, fullName } = req.body

  if (!userName || !email || !password || !fullName) {
    res.status(200).send("All fields are required")
  }

  const userAlready = await userModal.findOne({ email })

  if (userAlready) {
    return res.status(200).send("User already exists")
  }

  // hashing  the password before saving it into database
  const hashedPassword = await bcryptjs.hash(password, 10)

  //create the user
  const user = await userModal.create({
    userName: userName,
    email: email,
    password: hashedPassword,
    fullName: fullName,
    avtar: cloudinaryLink.secure_url,
  });

  await user.save()

  res.redirect("/login")

}catch (error) {
  console.log("failed to register the user");
}

})

Router.post(
  "/login",
  passport.authenticate("local", {
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
