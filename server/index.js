import express from 'express'
import {connectDB} from './database/DBConnection.js'
import cookieParser from 'cookie-parser';
import 'dotenv/config'
import  UserRouter  from './routes/User.js';
import PostRouter from './routes/Post.js';



export const app = express();
const PORT = process.env.PORT || 8080


// connecting with the DB
connectDB();





// middlewares
app.use(express.json({limit:'50kb'}));
app.use(express.urlencoded({
    extended:true,
    limit:'50kb'
}));
app.use(cookieParser());


// view engine setup
app.set("view engine","ejs")

// static file setup 
app.use(express.static('./Public'))




// mount the  router
app.use('/api/v1/createuser',UserRouter);
app.use('/api/v1/createpost',PostRouter);



// home route that is the login route 
app.get('/',(req,res)=>{
    res.render('Register')
})


// login page
app.get('/login', (req, res) => {
    res.render('Login')
})










app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`);
})