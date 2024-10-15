import express from 'express';
import cors from 'cors';
// import 'dotenv/config'
import connectCloudinary from './config/cloudinary.js';
import connectDB from './config/db.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv'

//App Config
dotenv.config()

const app = express();
const port = process.env.PORT || 4000;
connectDB()
connectCloudinary()

//middleware configuration

app.use(express.json());
// app.use(cors());

app.use(
    cors({
        origin: "https://shipshopstorefrontend.vercel.app",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

//---------------------------------------api endpoints-------------------------------------
//userController
app.use('/api/user', userRouter)

//productController
app.use('/api/product', productRouter)

// cartController
app.use('/api/cart', cartRouter)

//orderController
app.use('/api/order', orderRouter)

// Nodemailer transporter setup (configure with your email and credentials)
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service
    auth: {
        user: 'nipun.bakshi1209@gmail.com', // Your email
        pass: 'pvgo wskm akmv qskf'
    }
});

// POST route to handle subscription
app.post('/subscribe', (req, res) => {
    const { email } = req.body;

    // HTML content for the email
    const htmlContent = `
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank You for Subscribing!</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f8f9fa;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background-color: #28a745;
            color: white;
            text-align: center;
            padding: 20px;
        }
        .header img {
            max-width: 80%;
            margin: 10px 0;
        }
        .content {
            padding: 20px;
            text-align: center;
            color: #333;
        }
        .content h2 {
            margin-top: 0;
        }
        .content p {
            font-size: 16px;
            color: #555;
            line-height: 1.5;
        }
        .footer {
            background-color: #f8f9fa;
            text-align: center;
            padding: 10px;
            font-size: 12px;
            color: #777;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            margin-top: 20px;
            background-color: #ff5733;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            transition: background-color 0.3s;
        }
        .button:hover {
            background-color: #c70039;
        }
        img {
            max-width: 100%;
            height: auto;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="https://example.com/your-logo.png" alt="Your Store Logo">
            <h1>Thank You!</h1>
        </div>
        <div class="content">
            <h2>For Subscribing to Our Newsletter!</h2>
            <p>You will receive the latest updates and offers from our food and grocery store.</p>
            <p>Stay tuned for delicious recipes, special discounts, and more!</p>
            <img src="https://images.unsplash.com/photo-1694395998892-5225e95b8a47?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Colorful Food">
            <a href="#" class="button">Visit Our Store</a>
        </div>
        <div class="footer">
            <p>&copy; 2024 Your Food & Grocery Store. All rights reserved.</p>
        </div>
    </div>
</body>
</html>


    `;

    // Send an email using Nodemailer
    const mailOptions = {
        from: 'nipun.bakshi1209@gmail.com', // Sender address
        to: email, // List of receivers (the user's email)
        subject: 'Subscription Confirmation', // Subject line
        text: 'Thank you for subscribing to our newsletter! You will receive the latest updates and offers.',
        html: htmlContent // HTML body
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ message: 'Failed to send email' });
        }
        console.log('Email sent:', info.response);
        res.status(200).json({ message: 'Subscription successful. Confirmation email sent!' });
    });
});



app.get('/', (req, res) => {
    res.send("API WORKING")
})

app.listen(port, () => console.log("Server started on port " + port))