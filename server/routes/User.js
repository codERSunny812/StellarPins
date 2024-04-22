import express from "express"
import { UserModal } from "../models/user.modal.js";
import bcryptjs from 'bcryptjs'
import passport from "passport";

const Router = express.Router();



// route to create a user
Router.post('/register',  async(req, res, next)=> {

    console.log(req.body);

    const {userName , email , password , fullName} = req.body;
    
    if ( !userName || !email || !password || !fullName ){
        res.status(200).send("All fields are required");
    }

    const userAlready =await UserModal.findOne({email});

    if(userAlready){
        return res.status(200).send('User already exists');
    }


    // it will hashed the password
    const hashedPassword =  await bcryptjs.hash(password,10);


    //create the user 
    const user =await UserModal.create(({
        userName: userName,
        email: email,
        password:hashedPassword,
        fullName: fullName,
        
    }));

    await user.save()


  res.redirect('/login');

});


Router.post('/login', passport.authenticate('local', {
    successRedirect: '/feed', // Change this to your success route
    failureRedirect: '/login',
    failureFlash:true
}));


Router.get('/alluser',(req,res)=>{
    res.send("this is the all user");
})


Router.get('/logout',(req,res)=>{
    // req.logOut();
    res.redirect('/');
})


export default Router;