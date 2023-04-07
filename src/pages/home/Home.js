
import React, { useEffect, useState } from 'react'
import Banner from './Banner';
import url from '../../components/url';
import ProductCard from '../../components/ProductCard';


const Home = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetch(`${url}/products`)
      .then(res => res.json())
      .then(data => setProducts(data.data))

    fetch(`${url}/getCategoryName`)
      .then(res => res.json())
      .then(data => setCategories(data.data))

  }, [])
  console.log(products)
  return (
    <div>
      <div className='flex'>
        <div className='w-48'>
          <p className='pl-4 mt-3 py-3  text-white bg-pink-600'>Categories</p>
          <ul className='pl-4 mt-4'>
            {
              categories.map(c => <li key={c.id} className='group px-2 py-1 my-1 relative  hover:bg-pink-600 hover:text-white '>{c.categoryName}

                {
                  JSON.parse(c.subCategoryName).length !== 0 && <div>
                    <ul className='absolute bg-pink-600 text-white hidden group-hover:block w-32 top-0 left-[175px] z-30 p-2'>

                      {
                        JSON.parse(c.subCategoryName).map(c => <li key={c} className='p-1 hover:bg-white hover:text-black text-white'>{c}</li>)
                      }
                    </ul>
                  </div>
                }
              </li>)
            }
          </ul>
        </div>
        <div className='w-10/12'>
          <Banner />
        </div>
        <div className='w-'>

        </div>
      </div>
      <h1 className='font-bold text-3xl text-center mt-10'>In lowest price buy qualified regular product </h1>

     <div className='grid grid-cols-4 px-10 gap-7 mt-10'>
     {products.map(product =>
        <div key={product.id} className="bg-white shadow-red-900 shadow-lg rounded-lg overflow-hidden w-full ">
          <img className="w-full h-48 object-cover object-center" src={`http://localhost:8004/uploads/${product.img}`}alt="Product"/>
          <div className="p-4">
            <h2 className="text-gray-900 font-bold text-2xl mb-2">{product.name}</h2>
            <p className="text-gray-700 text-base">Product description goes here.</p>
            <div className="mt-3">
              <span className="text-gray-900 font-bold text-xl">{product.priceOfUnit}</span>
              <button className="bg-gray-800 text-white py-2 px-4 rounded-md ml-3 hover:bg-gray-900">Add to Cart</button>
            </div>
          </div>
        </div>
      )}
     </div>

    </div>
  )
}

export default Home