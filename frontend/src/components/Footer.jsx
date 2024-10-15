import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <div>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

                <div>
                    <img src={assets.logo3} className='mb-5 w-32' alt='Logo' />
                    <p className='w-full md:w-2/3 text-gray-600'>
                        At Ship Shop Store, we’re dedicated to providing you with the freshest groceries and an effortless shopping experience. Shop online and get your groceries delivered to your door.

                    </p>
                </div>

                <div>
                    <p className='text-xl font-medium mb-5'>COMPANY</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>Home</li>
                        <li>About</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>

                <div>
                    <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>Phone Number: </li>
                        <li>shipshopstoremails@gmail.com</li>
                    </ul>
                </div>
            </div>

            <div>
                <hr />
                <p className='py-5 text-sm text-center'>
                    Copyright 2024@shipshopstore.com - All Rights Reserved
                </p>
            </div>


        </div>
    )
}

export default Footer