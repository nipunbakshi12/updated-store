import express from 'express';
import { placeOrder, placeOrderRazorpay, updateStatus, userOrders, allOrders, verifyRazorpay } from '../controllers/orderController.js'
import adminAuth from './../middleware/adminAuth.js';
import authUser from './../middleware/auth.js';

const orderRouter = express.Router();

//Admin Features
orderRouter.post('/list', adminAuth, allOrders)
orderRouter.post('/status', adminAuth, updateStatus)

//Payment Routes
//COD
orderRouter.post('/place', authUser, placeOrder)

//Razorpay
orderRouter.post('/razorpay', authUser, placeOrderRazorpay)

//User Features
orderRouter.post('/userorders', authUser, userOrders)

//verifyPayments
orderRouter.post('/verifyRazorpay', authUser, verifyRazorpay)


export default orderRouter;
