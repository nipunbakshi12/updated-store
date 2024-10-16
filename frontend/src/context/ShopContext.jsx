import { createContext, useEffect, useState } from "react";
// import { products } from '../assets/assets'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export const ShopContext = createContext()

const ShopContextProvider = (props) => {
    const currency = '₹';
    const delivery_fee = 12;
    const backendUrl = 'https://updated-store-backend.onrender.com'
    const [search, setSearch] = useState('')
    const [showSearch, setShowSearch] = useState(false)
    const [cartItems, setCartItems] = useState({})
    const navigate = useNavigate()
    const [products, setProducts] = useState([])
    const [token, setToken] = useState('')

    // console.log('https://shipshopstorebackend.vercel.app')

    // const addToCart = async (itemId, size) => {

    //     if (!size) {
    //         toast.error("Select product size")
    //         return
    //     }
    //     let cartData = structuredClone(cartItems)
    //     if (cartData[itemId]) {
    //         if (cartData[itemId][size]) {
    //             cartData[itemId][size] += 1
    //         }
    //         else {
    //             cartData[itemId][size] = 1
    //         }
    //     }
    //     else {
    //         cartData[itemId] = {}
    //         cartData[itemId][size] = 1
    //     }
    //     setCartItems(cartData)

    //     // toast.success("Product added to cart!");

    //     if (token) {
    //         try {
    //             await axios.post('https://shipshopstorebackend.vercel.app' + '/api/cart/add', { itemId, size }, { headers: { token } })
    //         } catch (error) {
    //             console.log(error)
    //             toast.error('Error adding product to cart')
    //         }
    //     }

    // }

    //Prizes ka karna hai

    const addToCart = async (itemId) => {
        let cartData = structuredClone(cartItems)
        if (cartData[itemId]) {
            if (cartData[itemId]) {
                cartData[itemId] += 1
            }
            else {
                cartData[itemId] = 1
            }
        }
        else {
            cartData[itemId] = {}
            cartData[itemId] = 1
        }
        setCartItems(cartData)

        // toast.success("Product added to cart!");

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/add', { itemId }, { headers: { token } })
            } catch (error) {
                console.log(error)
                toast.error('Error adding product to cart')
            }
        }

    }

    // const getCartCount = () => {
    //     let totalCount = 0
    //     for (const items in cartItems) {
    //         for (const item in cartItems[items]) {
    //             try {
    //                 if (cartItems[items][item] > 0) {
    //                     totalCount += cartItems[items][item]
    //                 }
    //             } catch (error) {
    //                 console.log(error)
    //                 toast.error('Error calculating cart count')
    //             }
    //         }
    //     }
    //     return totalCount
    // }

    // useEffect(() => {
    //     console.log(cartItems)
    // }, [cartItems])

    const getCartCount = () => {
        let totalCount = 0
        for (const items in cartItems) {

            try {
                if (cartItems[items] > 0) {
                    totalCount += cartItems[items]
                }
            } catch (error) {
                console.log(error)
                toast.error('Error calculating cart count')
            }
        }
        return totalCount
    }

    // const updateQuantity = async (itemId, size, quantity) => {
    //     let cartData = structuredClone(cartItems)
    //     cartData[itemId][size] = quantity;
    //     setCartItems(cartData)
    //     if (token) {
    //         try {
    //             await axios.post('https://shipshopstorebackend.vercel.app' + '/api/cart/update', { itemId, size, quantity }, { headers: { token } })
    //         } catch (error) {
    //             console.log(error)
    //             toast.error('Error updating cart')
    //         }
    //     }
    // }

    const updateQuantity = async (itemId, quantity) => {
        let cartData = structuredClone(cartItems)
        cartData[itemId] = quantity;
        setCartItems(cartData)
        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/update', { itemId, quantity }, { headers: { token } })
            } catch (error) {
                console.log(error)
                toast.error('Error updating cart')
            }
        }
    }

    // const getCartAmount = () => {
    //     let totalAmount = 0
    //     for (const items in cartItems) {
    //         let itemInfo = products.find((product) => product._id === items)
    //         console.log(itemInfo, "ITEM INFO")
    //         for (const item in cartItems[items]) {
    //             try {
    //                 if (cartItems[items][item] > 0) {
    //                     totalAmount += cartItems[items][item] * itemInfo.price
    //                 }
    //             }
    //             catch (error) {
    //                 toast.error('Error calculating cart amount')
    //             }
    //         }
    //     }
    //     return totalAmount
    // }

    const getCartAmount = () => {
        let totalAmount = 0
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items)
            console.log(itemInfo, "ITEM INFO")

            try {
                if (cartItems[items] > 0) {
                    totalAmount += cartItems[items] * itemInfo.price
                }
            }
            catch (error) {
                toast.error('Error calculating cart amount')
            }
        }
        return totalAmount
    }

    const getProductsData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list')
            // console.log(response.data)
            if (response.data.success) {
                setProducts(response.data.products)
            }
            else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.error(error)
            toast.error("Failed to fetch products")
        }
    }

    const getUserCart = async (token) => {
        try {
            const response = await axios.post(backendUrl + '/api/cart/get', {}, { headers: { token } })
            if (response.data.success) {
                setCartItems(response.data.cartData)
            }
        } catch (error) {
            console.log(error)
            toast.error('Error fetching user cart')
        }
    }

    useEffect(() => {
        getProductsData()
        console.log(products);
    }, [])

    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
        }
    }, [])

    const value = {
        products, currency, delivery_fee,
        search, setSearch,
        showSearch, setShowSearch,
        cartItems, setCartItems, addToCart, getCartCount,
        updateQuantity, getCartAmount,
        navigate, backendUrl, getProductsData,
        setToken, token,
    }
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;
