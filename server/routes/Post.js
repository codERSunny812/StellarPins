import express from 'express'
import { postModal } from '../models/post.modal.js'
import { UserModal } from '../models/user.modal.js';
import { upload } from '../utils/Multer.config.js';



const Router = express.Router();


// route to create a  post
Router.post('/upload',upload.single('file'),async(req,res)=>{
if(!req.file) return res.status(404).send("no file found")


const user = await UserModal.findOne({_id:req.session.passport.user});

const newPost = await  postModal.create({
  caption: req.body.caption,
  imageUrl:req.file.filename,
  user:user._id
});

  await user.post(newPost._id);


await newPost.save();



  

   res.send("post created successfully");
})


export default Router;