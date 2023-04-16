
import React, { useEffect, useState } from 'react'
import Banner from './Banner';
import url from '../../components/url';
import ProductCard from '../../components/ProductCard';



const Home = () => {
  const [products, setProducts] = useState([])


  useEffect(() => {
    fetch(`${url}/products`)
      .then(res => res.json())
      .then(data => setProducts(data.data))

  }, [])

  return (
    <div>
      <div className=''>
        <div className='w-full'>
          <Banner />
        </div>
        <div className='w-'>

        </div>
      </div>
      <h1 className='font-bold text-3xl text-center mt-10'>In lowest price buy qualified regular product </h1>

      <div className='grid md:grid-cols-4 grid-cols-2 px-10 gap-7 mt-10'>
        {products.map((product, i) => <ProductCard key={i} product={product} />)}
      </div>

    </div>
  )
}

export default Home