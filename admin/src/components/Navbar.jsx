import React from 'react'
import { assets } from '../../../frontend/src/assets/assets'

const Navbar = () => {
  return (<>
    <div className='flex justify-between border-b-2 pt-6 pr-10 pl-10 pb-6'> 
      <img className='w-[10%]' src={assets.logo}/>
      <button className='bg-gray-600 text-white px-1 py-2 sm:px-7 sm:py-2 rounded-full text-xs  '>
        Log-Out
      </button>
    </div>

  </>

  )
}

export default Navbar
