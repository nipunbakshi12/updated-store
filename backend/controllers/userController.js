import userModel from "../models/userModel.js";
import validator from "validator"
import jwt from "jsonwebtoken"
import bcrypt from 'bcryptjs';

//create token
const createToken = (id) => {
    return jwt.sign({ id }, 'shipshop')
}

// Route for User Login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.json({
                success: false,
                message: "User not found."
            })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (isMatch) {
            const token = createToken(user._id)
            return res.json({
                success: true,
                message: "Logged in successfully",
                token
            })
        }
        else {
            return res.json({
                success: false,
                message: "Incorrect password / Invalid Credentials"
            })
        }
    } catch (error) {
        console.error(error.message)
        res.json({
            success: false,
            message: "Server Error in loginUser Controller"
        })
    }
}

// Route for User Registration
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        //checking user already exists or not
        const exists = await userModel.findOne({ email: email });
        if (exists) {
            return res.json({
                succes: false,
                message: "User already exists."
            })
        }

        //validating email and password
        if (!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: "Please enter a valid email"
            })
        }
        if (password.length < 8) {
            return res.json({
                success: false,
                message: "Password should be at least 8 characters long"
            })
        }

        //hashing password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //creating new user
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })

        const user = await newUser.save()

        const token = createToken(user._id)
        res.json({
            success: true,
            token
        })

    } catch (error) {
        console.error(error)
        res.json({ success: false, message: "Server Error in registerUser controller" })
    }
}

// Route for Admin Login
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, 'shipshop')
            res.json({
                success: true,
                message: "Admin Logged in successfully",
                token
            })
        }
        else {
            res.json({
                success: false,
                message: "Invalid Credentials"
            })
        }
    } catch (error) {
        console.error(error)
        res.json({
            success: false,
            message: "Server Error in adminLogin controller"
        })
    }

}

export { loginUser, registerUser, adminLogin }