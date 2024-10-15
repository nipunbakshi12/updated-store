import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets.js'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'

const PlaceOrder = () => {
    const [method, setMethod] = useState('razorpay')
    const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext)
    const [isDisabled, setIsDisabled] = useState(true);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        phone: ''
    })
    const onChangeHandler = (e) => {
        const name = e.target.name
        const value = e.target.value

        setFormData(data => ({
            ...data, [name]: value
        }))
    }

    const initPay = (order) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: 'Order Payment',
            description: 'Order Payment',
            order_id: order.id,
            receipt: order.receipt,
            handler: async (response) => {
                console.log(response)
                try {
                    const { data } = await axios.post(backendUrl + '/api/order/verifyRazorpay', response, { headers: { token } })
                    if (data.success) {
                        navigate('/orders')
                        setCartItems({})
                    }
                } catch (error) {
                    console.log(error)
                    toast.error('Error verifying payment')
                }
            }
        }
        const rzp = new window.Razorpay(options)
        rzp.open()
    }

    // const onSubmitHandler = async (e) => {
    //     e.preventDefault()
    //     try {
    //         let orderItems = []
    //         for (const items in cartItems) {
    //             for (const item in cartItems[items]) {
    //                 if (cartItems[items][item] > 0) {
    //                     const itemInfo = structuredClone(products.find(product => product._id === items))
    //                     if (itemInfo) {
    //                         itemInfo.size = item
    //                         itemInfo.quantity = cartItems[items][item]
    //                         orderItems.push(itemInfo)
    //                     }
    //                 }
    //             }
    //         }

    //         let orderData = {
    //             address: formData,
    //             items: orderItems,
    //             amount: getCartAmount() + delivery_fee
    //         }

    //         switch (method) {
    //             //API CALLS FOR COD
    //             case 'cod':
    //                 const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } })
    //                 // console.log(response, "apires")
    //                 if (response.data.success) {
    //                     setCartItems({})
    //                     navigate('/orders')
    //                 }
    //                 else {
    //                     toast.error(response.data.message)
    //                 }
    //                 break;

    //             case 'razorpay':
    //                 const responseRazorpay = await axios.post(backendUrl + '/api/order/razorpay', orderData, { headers: { token } })
    //                 if (responseRazorpay.data.success) {
    //                     // console.log(responseRazorpay.data.order)
    //                     initPay(responseRazorpay.data.order);
    //                 }
    //                 break;

    //             default:
    //                 break;

    //         }

    //         console.log('Order Items:', orderItems)
    //     } catch (error) {
    //         console.log(error)
    //         toast.error('Failed to place order')
    //     }

    // }

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        try {
            let orderItems = []
            for (const items in cartItems) {

                if (cartItems[items] > 0) {
                    const itemInfo = structuredClone(products.find(product => product._id === items))
                    if (itemInfo) {
                        itemInfo.quantity = cartItems[items]
                        orderItems.push(itemInfo)
                    }
                }
            }

            let orderData = {
                address: formData,
                items: orderItems,
                amount: getCartAmount() + delivery_fee
            }

            switch (method) {
                //API CALLS FOR COD
                case 'cod':
                    const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } })
                    // console.log(response, "apires")
                    if (response.data.success) {
                        setCartItems({})
                        navigate('/orders')
                    }
                    else {
                        toast.error(response.data.message)
                    }
                    break;

                case 'razorpay':
                    const responseRazorpay = await axios.post(backendUrl + '/api/order/razorpay', orderData, { headers: { token } })
                    if (responseRazorpay.data.success) {
                        // console.log(responseRazorpay.data.order)
                        initPay(responseRazorpay.data.order);
                    }
                    break;

                default:
                    break;

            }

            console.log('Order Items:', orderItems)
        } catch (error) {
            console.log(error)
            toast.error('Failed to place order')
        }

    }

    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh border-t]'>
            {/* ----------------LEFT SIDE------------- */}
            <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
                <div className='text-xl sm:text-2xl my-3'>
                    <Title text1={'DELIVERY'} text2={' INFORMATION'} />
                </div>
                <div className='flex gap-3'>
                    <input type='text' placeholder='First Name' onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' required />
                    <input type='text' placeholder='Last Name' onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' required />
                </div>
                <input type='email' placeholder='Email Addres' onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' required />
                <input type='text' placeholder='Street' onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' required />
                <div className='flex gap-3'>
                    <input type='text' placeholder='City' onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' required />
                    <input type='text' placeholder='State' onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' required />
                </div>
                <div className='flex gap-3'>
                    <input type='number' placeholder='Zip Code' onChange={onChangeHandler} name='zipCode' value={formData.zipCode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' required />
                    <input type='text' placeholder='Country' onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' required />
                </div>
                <input type='tel' placeholder='Mobile Number' onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' required />
            </div>

            {/* ------------------------RIGHT SIDE------------------------------ */}
            <div className='mt-8'>
                <div className='mt-8 min-w-80'>
                    <CartTotal />
                </div>
                <div className='mt-12'>
                    <Title text1={'PAYMENT'} text2={' METHOD'} />
                    {/* ------------------------PAYMENT METHODS--------------------------- */}
                    <div className='flex gap-3 flex-col lg:flex-row items-center justify-center'>
                        <div className='flex items-center gap-3 border p-2 px-3 cursor-pointer' onClick={() => setMethod('razorpay')}>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
                            <img src={assets.razorpay_logo} className='h-5 mx-4' />
                        </div>
                        {/* <div className='flex items-center gap-3 border p-2 px-3 cursor-pointer' onClick={() => setMethod('cod')}>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
                            <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
                        </div> */}
                        {/* <div
                            className={`flex items-center gap-3 border p-2 px-3 cursor-pointer ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={() => !isDisabled && setMethod('cod')}
                        >
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
                            <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
                        </div> */}
                    </div>
                    <div className='w-full text-end mt-8'>
                        <button className='bg-black text-white px-40 py-3 text-sm'>PLACE ORDER</button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default PlaceOrder