import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import connectCloudinary from './config/cloudinary.js';
import connectDB from './config/db.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';


//App Config

const app = express();
const port = process.env.PORT || 4000;
connectDB()
connectCloudinary()

//middleware configuration

app.use(express.json());
app.use(cors());

//---------------------------------------api endpoints-------------------------------------
//userController
app.use('/api/user', userRouter)

//productController
app.use('/api/product', productRouter)



app.get('/', (req, res) => {
    res.send("API WORKING")
})

app.listen(port, () => console.log("Server started on port " + port))