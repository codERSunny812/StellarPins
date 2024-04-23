import express from 'express'
import {connectDB} from './database/DBConnection.js'
import cookieParser from 'cookie-parser';
import 'dotenv/config'
import  UserRouter  from './routes/User.js';
import PostRouter from './routes/Post.js';
import initilizePassport  from './utils/PassportConfig.js';
import expressSession from 'express-session';
import passport from 'passport';
import flash from 'connect-flash'
import { UserModal } from './models/user.modal.js';



const app = express();
const PORT = process.env.PORT || 8080;


// view engine setup
app.set("view engine","ejs")

// static file setup 
app.use(express.static('./Public'))

// connecting the passport js to our application 
initilizePassport();


// connecting with the DB
connectDB();

// middlewares
app.use(flash());
app.use(expressSession({
    secret:"this is a secret",
    resave:false,
    saveUninitialized:false
}));
app.use(express.json({limit:'50kb'}));
app.use(express.urlencoded({
    extended:true,
    limit:'50kb'
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());




// mount the  router
app.use('/api/v1/createuser',UserRouter);
app.use('/api/v1/createpost',PostRouter);



// home route that is the login route 
app.get('/',(req,res)=>{
    res.render('Register')
})


// login page
app.get('/login', (req, res) => {
    res.render('Login',{error:req.flash('error')});
})


// profile page
app.get('/profile',async (req,res)=>{
    const user = await UserModal.findOne({_id:req.session.passport.user});

  //when a user is logged in then a user data is stored in the passpor.user
    console.log(user)

    res.render('Profile',{user})


})

// feed page 
app.get('/feed', (req, res) => {
    res.render('Feed')
})


// create post page
app.get('/createpost',(req,res)=>{
    res.render('Create')
})


 
app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`);
})