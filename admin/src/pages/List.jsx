import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import axios from 'axios'
import { toast } from 'react-toastify'

const List = ({ token }) => {
  const [list, setList] = useState([])

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list');
      console.log(response.data); // Check the structure of the data
      if (response.data.success) {
        setList(response.data.products || []); // Adjust based on actual structure
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching product list:', error);
      toast.error('Error fetching product list');
    }
  };

  const removeProduct = async (id) => {
    try {
      const resonse = await axios.post(backendUrl + '/api/product/remove', { id }, { headers: { token } })
      if (resonse.data.success) {
        toast.success(resonse.data.message);
        await fetchList();
      }
      else {
        toast.error(resonse.data.message);
      }
    } catch (error) {
      console.log(error)
      toast.error('Error removing product');
    }
  }


  useEffect(() => {
    fetchList()
  }, [])

  return (
    <>
      <p className='mb-2'>All Products List</p>
      <div className='flex flex-col gap-2'>
        {/* -----------------------LIST TABLE TITLE---------------- */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Price</b>
          <b>Category</b>
          <b className='text-center'>Action</b>
        </div>
        {/* -----------------------Product LIST TABLE DATA---------------- */}
        {
          list.map((item, index) => (
            <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm' key={index}>
              <img className='w-12' src={item.image[0]} />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{currency}{item.price}</p>
              <p onClick={() => removeProduct(item._id)} className='text-right md:text-center cursor-pointer text-lg'>X</p>
            </div>
          ))
        }
      </div>

    </>
  )
}

export default List
