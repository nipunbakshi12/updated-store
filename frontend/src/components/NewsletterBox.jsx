// import React from 'react'

// const NewsletterBox = () => {
//     const onSubmitHandler = (e) => {
//         e.preventDefault();
//     }
//     return (
//         <div className='text-center'>
//             <p className='text-2xl font-medium text-gray-800'>Subscribe now and get 20% off</p>
//             <p className='text-gray-400 mt-3'>
//                 Lorem Ipsum is simply dummy text of the printing and typesetting industry
//             </p>
//             <form className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3' onSubmit={onSubmitHandler}>
//                 <input type='email' placeholder='Enter your email' className='w-full sm:flex-1 outline-none' required />
//                 <button type='submit' className='bg-black text-white text-xs px-10 py-4'>Subscribe</button>
//             </form>
//         </div>
//     )
// }

// export default NewsletterBox



import React, { useState } from 'react';

const NewsletterBox = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:4000/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            const data = await response.json();
            if (response.ok) {
                setMessage('Subscription successful. A confirmation email has been sent to your inbox.');
            } else {
                setMessage('Failed to subscribe. Please try again.');
            }
        } catch (error) {
            setMessage('Error occurred. Please try again.');
        }
    }

    return (
        <div className='text-center'>
            <p className='text-2xl font-medium text-gray-800'>Subscribe now and get 20% off</p>
            <p className='text-gray-400 mt-3'>
                <b>Stay Fresh, Stay Updated!</b><br />
                Subscribe to get exclusive deals, fresh product updates, and delicious recipe ideas straight to your inbox. Don't miss out!
            </p>
            <form className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3' onSubmit={onSubmitHandler}>
                <input
                    type='email'
                    placeholder='Enter your email'
                    className='w-full sm:flex-1 outline-none'
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type='submit' className='bg-black text-white text-xs px-10 py-4'>Subscribe</button>
            </form>
            {message && <p className='text-green-500 mt-2'>{message}</p>}
        </div>
    );
};

export default NewsletterBox;
