import { v2 as cloudinary } from "cloudinary";

const connectCloudinary = async () => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_SECRET_KEY
    })

    // cloudinary.config({
    //     cloud_name: 'di6mw3ws0',
    //     api_key: "387953645195177",
    //     api_secret: 'Hf2sH6mHaROXk5XRaJLWV0z14p0'
    // })

}

export default connectCloudinary