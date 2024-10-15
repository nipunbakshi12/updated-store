import mongoose from 'mongoose';
const connectDB = async () => {
    mongoose.connection.on("connected", () => {
        console.log("MongoDB Connected");
    });
    await mongoose.connect(`${process.env.MONGODB_URI || "mongodb+srv://vinodbakshi1970:qcnsNYTN4fHwH54A@cluster0.xu5yf.mongodb.net"}/ecommerce-store`)

}

export default connectDB