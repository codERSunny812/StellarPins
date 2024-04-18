import express from 'express'
import {connectDB} from './database/DBConnection.js'
import 'dotenv/config'


const app = express();
const PORT = process.env.PORT || 8080


// connecting with the DB
connectDB();









app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`);
})