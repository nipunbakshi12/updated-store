import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
    return (
        <div>
            <div className='text-2xl text-center pt-8 border-t'>
                <Title text1={'ABOUT'} text2={' US'} />
            </div>
            <div className='my-10 flex flex-col md:flex-row gap-16'>
                <img src={assets.about_img} className='w-full md:max-w-[450px]' />
                <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
                    <p>Welcome to ShipShopStore, your trusted partner for fresh and quality groceries delivered right to your doorstep. We started with a simple goal: to provide busy households with easy access to premium, handpicked groceries, all while ensuring convenience, affordability, and sustainability.<br /><br />
                        At ShipShopStore, we understand the importance of fresh, nutritious food in every home. That’s why we go the extra mile to source the finest fruits, vegetables, dairy products, pantry staples, and more. Our team works directly with farmers and trusted suppliers to ensure that every product you receive meets the highest standards of quality and freshness.<br /><br /></p>

                    <b className='text-gray-800'>OUR MISSION</b>
                    <p>We believe in making a positive impact on the community and the environment. By partnering with local farmers and using eco-friendly packaging, we aim to reduce our carbon footprint and support sustainable agriculture. Our goal is to create a healthier, happier world—one grocery delivery at a time.<br /><br />

                        Thank you for choosing ShipShopStore. We’re proud to be a part of your kitchen and your daily life, helping you eat well and live well. Join us on our journey toward fresh, sustainable living.
                        <br /><br />
                        <b>Happy shopping!</b></p>
                </div>
            </div>
            <div className='text-xl py-4'>
                <Title text1={'WHY'} text2={' CHOOSE US'} />
            </div>
            <div className='flex flex-col md:flex-row text-sm mb-20'>
                <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                    <b>QUALITY ASSURANCE</b>
                    <p className='text-gray-600'>We carefully source our products from trusted suppliers and local farmers, ensuring only the freshest and highest-quality items make it to your kitchen.</p>
                </div>
                <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                    <b>CONVENIENCE</b>
                    <p className='text-gray-600'>Our platform makes grocery shopping effortless. With an intuitive online experience, easy ordering, and fast doorstep delivery</p>
                </div>
                <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                    <b>EXCEPTIONAL CUSTOMER SERVICE</b>
                    <p className='text-gray-600'>We’re committed to providing top-notch customer service. Whether you have a question about a product or need help with your order, our friendly and dedicated team is here to assist .</p>
                </div>
            </div>
            <NewsletterBox />
        </div>
    )
}

export default About