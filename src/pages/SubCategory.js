import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import url from '../components/url';

const SubCategory = () => {

  // const [count, setCount] = useState(0);
  // const [size] = useState(5)
  // const [page, setPage] = useState(0);
  const query = useParams()
  const subCategoryName = query.subCategoryName;


  const [products, setProducts] = useState([])

  useEffect(() => {

    fetch(`${url}/getProductBySubCategoryName/${subCategoryName}`, {
      method: 'GET',
      headers: {
        'authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
    }).then(res => res.json())
      .then(data => setProducts(data.data))


  }, [subCategoryName])

  // useEffect(() => {
  //   fetch(`https://mohid-shop.onrender.com/proCount/${subCategoryName}`)
  //     .then(res => res.json())
  //     .then(data => setCount(data.count))
  // }, [subCategoryName])

  // if (isLoading) {
  //   return <div className='min-h-[600px] flex justify-center font-bold text-3xl mt-10'> <p>Loading...</p></div>
  // }

  return (
    <div className='min-h-[600px]'>
      <h1 className='font-bold text-3xl text-center my-10'>{subCategoryName}</h1>
      <div className='grid grid-cols-4 px-10 gap-7 mt-10'>
        {products.map(product => <ProductCard product={product} />)}
      </div>

      {/* <div className='flex justify-center'>
    <div className='mt-10'>
      {
        [...Array(Math.ceil(count / size)).keys()]?.map(number => <button key={number} className={page === number ? 'bg-pink-700 px-1 m-1  text-white border-[1px] border-pink-700 text-xs font-bold' : 'bg-white px-1 m-1  border-[1px] border-pink-700 text-xs font-bold'} onClick={() => setPage(number)}>{number}</button>)
      }
    </div>
  </div> */}

    </div>
  )
}


export default SubCategory