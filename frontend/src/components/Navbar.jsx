import React, { useContext, useState } from 'react'
import { assets } from './../assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { CiLogin } from "react-icons/ci";

const Navbar = () => {

    const [visible, setVisible] = useState(false)
    const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext)


    const logout = () => {
        navigate('/login')
        localStorage.removeItem('token')
        setToken('')
        setCartItems([])
    }

    return (
        <div className='flex items-center justify-between py-5 font-medium'>
            <Link to='/'>
                <img src={assets.logo3} className='w-36' alt="" />
            </Link>
            <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
                <NavLink to='/' className="flex flex-col items-center gap-1">
                    <p>HOME</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>

                <NavLink to='/collection' className="flex flex-col items-center gap-1">
                    <p>STORE</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>

                <NavLink to='/about' className="flex flex-col items-center gap-1">
                    <p>ABOUT</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>

                <NavLink to='/contact' className="flex flex-col items-center gap-1">
                    <p>CONTACT</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
            </ul>

            <div className='flex items-center gap-6 sm:gap-3 sm:px-2'>
                <img src={assets.search_icon} className='w-5 cursor-pointer hover:w-6 hover:min-w-6 transition-all duration-300' onClick={() => setShowSearch(true)} />

                <div className='group relative'>
                    {token ? (
                        <>
                            <img
                                onClick={() => (token ? null : navigate("/login"))}
                                src={assets.profile_icon}
                                className="w-5 cursor-pinter hover:w-6 hover:min-w-6 transition-all duration-300"
                            />
                        </>
                    ) : (
                        <button className='flex items-center justify-center mt-1 px-4 py-3 rounded-xl bg-white hover:bg-gray-100'>
                            <Link to="/login" className="flex items-center justify-center hover:w-6 hover:min-w-6 transition-all duration-300">
                                <CiLogin className='w-7 h-7' style={{ color: '#404040' }} />
                            </Link>
                        </button>
                    )}

                    {/*---------------------- DropDown Menu------------- */}
                    {
                        token &&
                        <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-50'>
                            <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded shadow-lg'>
                                <p className='cursor-pointer hover:text-black'>My Profile</p>
                                <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                                <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
                            </div>
                        </div>
                    }

                </div>

                <Link to='/cart' className='relative'>
                    <img src={assets.cart_icon} className='w-5 min-w-5 hover:w-6 hover:min-w-6 transition-all duration-300' />
                    <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
                </Link>
                <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' />
            </div>

            {/* Sidebar Menu for small screen */}
            <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
                <div className='flex flex-col text-gray-600'>

                    <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                        <img src={assets.dropdown_icon} className='h-4 rotate-180' />
                        <p>Back</p>
                    </div>

                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/'>HOME</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/collection'>COLLECTION</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/about'>ABOUT</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/contact'>CONTACT</NavLink>
                </div>
            </div>

        </div>
    )
}

export default Navbar



// import React, { useContext, useState } from "react";
// import { assets } from "./../assets/assets";
// import { Link, NavLink } from "react-router-dom";
// import { ShopContext } from "../context/ShopContext";

// const Navbar = () => {
//     const [visible, setVisible] = useState(false);
//     const {
//         setShowSearch,
//         getCartCount,
//         navigate,
//         token,
//         setToken,
//         setCartItems,
//     } = useContext(ShopContext);

//     const logout = () => {
//         navigate("/login");
//         localStorage.removeItem("token");
//         setToken("");
//         setCartItems([]);
//     };

//     return (
//         <div className="flex items-center justify-between py-5 font-medium">
//             <Link to="/">
//                 <img src={assets.logo3} className="w-36 h-16" alt="logo" />
//             </Link>
//             <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
//                 <NavLink to="/" className="flex flex-col items-center gap-1">
//                     <p>HOME</p>
//                     <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
//                 </NavLink>

//                 <NavLink to="/collection" className="flex flex-col items-center gap-1">
//                     <p>STORE</p>
//                     <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
//                 </NavLink>

//                 <NavLink to="/about" className="flex flex-col items-center gap-1">
//                     <p>ABOUT</p>
//                     <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
//                 </NavLink>

//                 <NavLink to="/contact" className="flex flex-col items-center gap-1">
//                     <p>CONTACT</p>
//                     <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
//                 </NavLink>
//             </ul>

//             <div className="flex items-center gap-6">
//                 <Link to="/collection">
//                     <img
//                         src={assets.search_icon}
//                         className="w-5 min-w-5 hover:w-6 hover:min-w-6 transition-all duration-300"
//                         onClick={() => setShowSearch(true)}
//                     />
//                 </Link>

//                 <div className="group relative z-10">
//                     {token ? (
//                         <>
//                             <img
//                                 onClick={() => (token ? null : navigate("/login"))}
//                                 src={assets.profile_icon}
//                                 className="w-5 min-w-5 hover:w-6 hover:min-w-6 transition-all duration-300"
//                             />
//                         </>
//                     ) : (
//                         <button className="hover:bg-white hover:text-black">
//                             <Link
//                                 to="/login"
//                                 className="  px-4 py-2 rounded-xl hover:bg-zinc-800  hover:text-white transition-all duration-300"
//                             >
//                                 Login
//                             </Link>
//                         </button>
//                     )}

//                     {/*---------------------- DropDown Menu------------- */}
//                     {token && (
//                         <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
//                             <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
//                                 <p className="cursor-pointer hover:text-black ">My Profile</p>
//                                 <p
//                                     onClick={() => navigate("/orders")}
//                                     className="cursor-pointer hover:text-black "
//                                 >
//                                     Orders
//                                 </p>
//                                 <p onClick={logout} className="cursor-pointer hover:text-black">
//                                     Logout
//                                 </p>
//                             </div>
//                         </div>
//                     )}
//                 </div>

//                 <Link to="/cart" className="relative">
//                     <img
//                         src={assets.cart_icon}
//                         className="w-5 min-w-5 hover:w-6 hover:min-w-6 transition-all duration-300"
//                     />
//                     <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
//                         {getCartCount()}
//                     </p>
//                 </Link>
//                 <img
//                     onClick={() => setVisible(true)}
//                     src={assets.menu_icon}
//                     className="w-5 cursor-pointer sm:hidden"
//                 />
//             </div>

//             {/* Sidebar Menu for small screen */}
//             <div
//                 className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? "w-full" : "w-0"
//                     }`}
//             >
//                 <div className="flex flex-col text-gray-600">
//                     <div
//                         onClick={() => setVisible(false)}
//                         className="flex items-center gap-4 p-3 cursor-pointer"
//                     >
//                         <img src={assets.dropdown_icon} className="h-4 rotate-180" />
//                         <p>Back</p>
//                     </div>

//                     <NavLink
//                         onClick={() => setVisible(false)}
//                         className="py-2 pl-6 border"
//                         to="/"
//                     >
//                         HOME
//                     </NavLink>
//                     <NavLink
//                         onClick={() => setVisible(false)}
//                         className="py-2 pl-6 border"
//                         to="/collection"
//                     >
//                         COLLECTION
//                     </NavLink>
//                     <NavLink
//                         onClick={() => setVisible(false)}
//                         className="py-2 pl-6 border"
//                         to="/about"
//                     >
//                         ABOUT
//                     </NavLink>
//                     <NavLink
//                         onClick={() => setVisible(false)}
//                         className="py-2 pl-6 border"
//                         to="/contact"
//                     >
//                         CONTACT
//                     </NavLink>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Navbar;
