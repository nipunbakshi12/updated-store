import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import RelatedProducts from '../components/RelatedProducts'
import "./product.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Product = () => {
    const { productId } = useParams()
    // console.log(productId)
    const { products, currency, addToCart } = useContext(ShopContext)
    const [productData, setProductData] = useState(false)
    const [image, setImage] = useState('')
    // const [size, setSize] = useState('')
    const [isAnimating, setIsAnimating] = useState(false);

    const fetchProductData = async () => {
        products.map((item) => {
            if (item._id == productId) {
                setProductData(item)
                // console.log(item)
                setImage(item.image[0])
                return null
            }
        })
    }

    const handleAddToCart = () => {
        // if (!size) {
        //     toast.error("Please select a size");
        //     return;
        // }

        setIsAnimating(true);
        // addToCart(productData._id, size);
        addToCart(productData._id);


        // Set a timeout to remove the animation class after the animation completes
        setTimeout(() => {
            setIsAnimating(false);
        }, 1000);
    };


    useEffect(() => {
        fetchProductData()
    }, [productId, products])

    return productData ? (
        <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
            {/* --------------PRODUCT DATA----------------- */}
            <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
                {/* ---------------PRODUCT IMAGES---------------- */}
                <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
                    <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
                        {productData.image.map((item, index) => (
                            <img key={index} src={item} alt={productData.title} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' onClick={() => setImage(item)} />
                        ))}
                    </div>
                    <div className='w-full sm:w-[80%]'>
                        <img src={image} className='w-full h-auto' />
                    </div>
                </div>

                {/*---------------- PRODUCT DETAILS ---------------------*/}
                <div className='flex-1'>
                    <h1 className='font-medium mt-2 text-2xl'>{productData.name}</h1>
                    <div className='flex items-center gap-1 mt-2'>
                        <img src={assets.star_icon} className='w-3 5' />
                        <img src={assets.star_icon} className='w-3 5' />
                        <img src={assets.star_icon} className='w-3 5' />
                        <img src={assets.star_icon} className='w-3 5' />
                        <img src={assets.star_dull_icon} className='w-3 5' />
                        {/* <p className='pl-2'>(122)</p> */}
                    </div>
                    <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
                    <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
                    {/* <div className='flex flex-col gap-4 my-8'>
                        <p>Select Size</p>
                        <div className='flex gap-2'>
                            {productData.sizes.map((item, index) => (
                                <button onClick={() => setSize(item)} key={index} className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ''}`}>{item}</button>
                            ))}
                        </div>
                    </div> */}
                    {/* <button className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700' onClick={() => addToCart(productData._id, size)}>ADD TO CART</button> */}

                    {isAnimating && (
                        <img src={image} className="image-fly" alt="Flying product" />
                    )}

                    <button
                        className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
                        onClick={handleAddToCart}
                    >
                        ADD TO CART
                    </button>

                    <hr className='mt-8 sm:w-4/5' />
                    <div className='text-sm texxt-gray-500 mt-5 flex flex-col gap-1'>
                        <p>100% Original Product</p>
                        <p>Easy return and exchange policy</p>
                    </div>
                </div>
            </div>

            {/*----------------- PRODUCT DESCRIPTION & REVIEWS ---------------------*/}
            <div className='mt-20'>
                <div className='flex'>
                    <b className='border px-5 py-3 text-sm'>Description</b>
                    <p className='border px-5 py-3 text-sm'>Reviews</p>
                </div>
                <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
                    <p>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                    <p>It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                </div>
            </div>

            {/* -------------DISPLAY RELATED PRODUCTS--------------- */}
            <RelatedProducts category={productData.category} subcategory={productData.subcategory} />

        </div>
    ) : <div className='opacity-0'>

    </div>
}

export default Product