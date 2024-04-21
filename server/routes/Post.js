import express from 'express'
import { postModal } from '../models/post.modal.js'
import { UserModal } from '../models/user.modal.js';



const Router = express.Router();



// route to create a  post

Router.post('/',async(req,res)=>{
    const {title , userId} = req.body
   const createdPost = await postModal.create({
    caption:title,
    user:userId
   });
    await createdPost.save();

//    user who create the post 
let user = await UserModal.findOne({_id:userId});
  user.post.push(createdPost._id);

  await user.save();

  

   res.send("post created successfully");
})


export default Router;