import React from 'react'
import { Link } from 'react-router-dom'

const ProductCard = ({ product }) => {
    return (
        <div className='h-64 w-full border-[1px] border-pink-900 overflow-hidden rounded-lg relative'>
            <Link to={`/productDetails/${product.id}`} className=''>


                <img className='w-full h-44 border-b-[1px] border-pink-900' src={product.img} alt="" />
                <div className='ml-2 pb-2 '>
                    <p>{product.name}</p>
                    <p className='font-bold'>${product.price}</p>
                    
                </div>
                <button className='bg-pink-500 w-full bottom-0 absolute text-white py-1'>Show Details</button>
            </Link>
        </div>
    )
}

export default ProductCard