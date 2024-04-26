import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'



// cloudinary confugiration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_KEY_SECRET,
});




export const connectCloudinary = async(localFilePath)=>{
    try {
        console.log("inside the local file path");

        if (!localFilePath) return null;

        //upload the file on the cloudinary server
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });

        


        return response;

    } catch (error) {
        //as the operation got faild then it will remove the file
        fs.unlinkSync(localFilePath);

        return null;
    }

}