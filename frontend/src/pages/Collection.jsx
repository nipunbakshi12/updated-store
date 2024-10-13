import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from './../context/ShopContext';
import { assets } from '../assets/assets';
import Title from './../components/Title';
import ProductItem from './../components/ProductItem';

const Collection = () => {

    const { products, search, showSearch } = useContext(ShopContext)
    const [showFilters, setShowFilters] = useState(false)
    const [filterProducts, setFilterProducts] = useState([])
    const [category, setCategory] = useState([])
    const [subCategory, setSubCategory] = useState([])
    const [sortType, setSortType] = useState('relevant')

    const toggleCategory = (e) => {
        if (category.includes(e.target.value)) {
            setCategory(prev => prev.filter(item => item !== e.target.value))
        }
        else {
            setCategory(prev => [...prev, e.target.value])
        }
    }

    const toggleSubCategory = (e) => {
        if (subCategory.includes(e.target.value)) {
            setSubCategory(prev => prev.filter(item => item !== e.target.value))
        }
        else {
            setSubCategory(prev => [...prev, e.target.value])
        }
    }

    const applyFilter = () => {
        let productsCopy = products.slice();

        if (showSearch && search) {
            productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
        }

        if (category.length > 0) {
            productsCopy = productsCopy.filter(item => category.includes(item.category));
        }
        if (subCategory.length > 0) {
            productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
        }
        setFilterProducts(productsCopy)
    }

    const sortProduct = () => {
        let filterProductCopy = filterProducts.slice()
        switch (sortType) {
            case 'low-high':
                setFilterProducts(filterProductCopy.sort((a, b) => (a.price - b.price)))
                break;
            case 'high-low':
                setFilterProducts(filterProductCopy.sort((a, b) => (b.price - a.price)))
                break;
            default:
                applyFilter()
                break
        }
    }

    // useEffect(() => {
    //     setFilterProducts(products)
    // }, [])

    useEffect(() => {
        applyFilter()
    }, [category, subCategory, search, showSearch, products])

    useEffect(() => {
        sortProduct()
    }, [sortType])

    return (
        <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
            {/* FILTER OPTIONS */}
            <div className='min-w-60'>
                <p onClick={() => setShowFilters(!showFilters)} className='my-2-text-xl flex items-center cursor-pointer gap-2'>FILTERS
                    <img src={assets.dropdown_icon} className={`h-3 sm:hidden ${showFilters ? 'rotate-90' : ''}`} />
                </p>

                {/* CATEGORY FILTER */}
                <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilters ? '' : 'hidden'} sm:block`}>
                    <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
                    <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                        <p className='flex gap-2'>
                            <input type='checkbox' className='w-3' value={'Fruits & Vegetables'} onChange={toggleCategory} />Fruits & Vegetables
                        </p>
                        <p className='flex gap-2'>
                            <input type='checkbox' className='w-3' value={'Dairy & Eggs'} onChange={toggleCategory} />Dairy & Eggs
                        </p>
                        <p className='flex gap-2'>
                            <input type='checkbox' className='w-3' value={'Beverages'} onChange={toggleCategory} />Beverages
                        </p>
                        <p className='flex gap-2'>
                            <input type='checkbox' className='w-3' value={'Bakery & Snacks'} onChange={toggleCategory} />Bakery & Snacks
                        </p>
                        <p className='flex gap-2'>
                            <input type='checkbox' className='w-3' value={'Household Items'} onChange={toggleCategory} />Household Items
                        </p>
                    </div>
                </div>
                {/* SUBCATEGORY FILTER */}

                <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilters ? '' : 'hidden'} sm:block`}>
                    <p className='mb-3 text-sm font-medium'>TYPE</p>
                    <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                        <p className='flex gap-2'>
                            <input type='checkbox' className='w-3' value={'Fresh Fruits'} onChange={toggleSubCategory} />Fresh Fruits
                        </p>
                        <p className='flex gap-2'>
                            <input type='checkbox' className='w-3' value={'Fresh Vegetables'} onChange={toggleSubCategory} />Fresh Vegetables
                        </p>
                        <p className='flex gap-2'>
                            <input type='checkbox' className='w-3' value={'Milk'} onChange={toggleSubCategory} />Milk
                        </p>
                        <p className='flex gap-2'>
                            <input type='checkbox' className='w-3' value={'Cheese'} onChange={toggleSubCategory} />Cheese
                        </p>
                        <p className='flex gap-2'>
                            <input type='checkbox' className='w-3' value={'Soft Drinks'} onChange={toggleSubCategory} />Soft Drinks
                        </p>
                        <p className='flex gap-2'>
                            <input type='checkbox' className='w-3' value={'Juices'} onChange={toggleSubCategory} />Juices
                        </p>
                        <p className='flex gap-2'>
                            <input type='checkbox' className='w-3' value={'Bread'} onChange={toggleSubCategory} />Bread
                        </p>
                        <p className='flex gap-2'>
                            <input type='checkbox' className='w-3' value={'Biscuits'} onChange={toggleSubCategory} />Biscuits
                        </p>
                        <p className='flex gap-2'>
                            <input type='checkbox' className='w-3' value={'Cleaning Supplies'} onChange={toggleSubCategory} />Cleaning Supplies
                        </p>
                        <p className='flex gap-2'>
                            <input type='checkbox' className='w-3' value={'Personal Care'} onChange={toggleSubCategory} />Personal Care
                        </p>
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE */}
            <div className='flex-1'>
                <div className='flex justify-between text-base sm:text-2xl mb-4'>
                    <Title text1={'ALL'} text2={' COLLECTIONS'} />
                    {/* PRODUCT SORT */}
                    <select className='border-2 border-gray-300 text-sm px-2' onChange={(e) => setSortType(e.target.value)}>
                        <option value="relevant">Sort by: Relevant</option>
                        <option value="low-high">Sort by: Low to High</option>
                        <option value="high-low">Sort by: High to Low</option>
                    </select>
                </div>
                {/* MAP PRODUCTS */}
                <div className='grid grid-cols-2 md:grid-cols-3 lg-grid-cols-4 gap-4 gap-y-6'>
                    {
                        filterProducts.map((item, index) => (
                            <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Collection