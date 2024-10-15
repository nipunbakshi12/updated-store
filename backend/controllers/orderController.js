import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"
import razorpay from 'razorpay'

//global Variables used in this files
// const currency = 'inr'
// const deliveryCharge = 12

//gateway initialize
const razorpayInstance = new razorpay({
    key_id: 'rzp_test_qeuXdVkQfgPPe3',
    key_secret: 'Eh21oX8hyVpVYsuIHwLy0cR4',
})

// placing orders using COD
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now(),
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId, {
            cartData: {}
        })

        res.json({
            success: true,
            message: "Order placed successfully."
        })

    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: "Server Error in placeOrder controller"
        })
    }
}

//Placing order using razorpay method
const placeOrderRazorpay = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Razorpay",
            payment: false,
            date: Date.now(),
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const options = {
            amount: amount * 100,
            currency: 'INR',
            receipt: newOrder._id.toString(),
        }

        await razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                console.log(error)
                return res.json({
                    success: false,
                    message: "Error in creating order"
                })
            } else {
                res.json({
                    success: true,
                    order,
                    message: "Order created successfully. Redirect to payment gateway."
                })
            }
        })


    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: "Server Error in placeOrderRazorpay controller"
        })
    }
}

const verifyRazorpay = async (req, res) => {
    try {
        const { userId, razorpay_order_id } = req.body
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        if (orderInfo.status === 'paid') {
            await orderModel.findByIdAndUpdate(orderInfo.receipt, { payment: true })
            await userModel.findByIdAndUpdate(userId, {
                cartData: {}
            })
            res.json({
                success: true,
                message: "Payment successful. Order placed successfully."
            })
        }
        else {
            res.json({
                success: false,
                message: "Payment failed. Please try again."
            })
        }
        // console.log(orderInfo)
    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: "Server Error in verifyRazorpay controller"
        })
    }
}

//All orders at admin panel
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        res.json({
            success: true,
            orders
        })
    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: "Server Error in allOrders controller"
        })
    }

}

//User Order data for frontend
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body
        const orders = await orderModel.find({
            userId
        })
        res.json({
            success: true,
            orders
        })
    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: "Server Error in userOrders controller"
        })
    }

}

//Update order status
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body
        await orderModel.findByIdAndUpdate(orderId, { status })
        res.json({
            success: true,
            message: "Order status updated successfully."
        })
    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: "Server Error in updateStatus controller"
        })
    }
}

export { placeOrder, placeOrderRazorpay, updateStatus, userOrders, allOrders, verifyRazorpay }