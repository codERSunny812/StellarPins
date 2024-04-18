import mongoose from 'mongoose';

// function to connect the DB with you
export const connectDB = async()=>{
try{
    await mongoose.connect("mongodb://127.0.0.1:27017/PintrestClone")
    .then(()=>{
        console.log("the data base is connected successfully");
    })
    .catch((error)=>{
        console.log("the data base is not connected successfully");
    })
    
}
catch (error) {
    console.log(`mongodb is getting error ${error}`);
}
}