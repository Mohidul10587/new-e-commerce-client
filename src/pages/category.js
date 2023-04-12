import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import url from '../components/url'
import ProductCard from '../components/ProductCard';

const Category = () => {
    const query = useParams()
    const productCategory = query.productCategory

    const [products, setProducts] = useState([])

    useEffect(() => {

        fetch(`${url}/getProductByCategory/${productCategory}`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(res => res.json())
            .then(data => setProducts(data.data))


    }, [productCategory])

    return (
        <div className='min-h-screen '>
            <div className='grid grid-cols-4 px-10 gap-7 mt-10'>
                {products.map(product => <ProductCard product={product}/>)}
            </div>
        </div>
    )
}

export default Category