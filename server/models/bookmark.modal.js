import mongoose from 'mongoose'


const bookmarkSchema = new mongoose.Schema({

    imageUrl:{
        type:String,
        required:true
    },
    caption:{
        type:String,
        required:true
    },
    user:{
        type:String,
        required:true
    }

},{
    timestamps:true
}
);


export const  bookmarksModel = mongoose.model("bookmarksModel",bookmarkSchema);