import express from "express"
import { UserModal } from "../models/user.modal.js";

const Router = express.Router();



// route to create a user
Router.post('/register',  async(req, res, next)=> {
    
    const {userName , email , password , fullName} = req.body;
    
    if ( !userName || !email || !password || !fullName ){
        res.status(200).send("All fields are required");
    }

    const userAlready =await UserModal.findOne({email});

    if(userAlready){
        return res.status(200).send('User already exists');
    }

    //create the user 
    const user =await UserModal.create(({
        userName: userName,
        email: email,
        password: password,
        fullName: fullName,
        
    }));

    await user.save()


    return res.send("user created successfully");

});

Router.post('/alluser',(req,res)=>{
    res.send("this is the all user");
})


export default Router;