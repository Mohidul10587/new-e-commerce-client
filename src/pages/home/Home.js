
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
  const [categories, setCategory] = useState([])
  useEffect(() => {
    fetch('category.json')
      .then(res => res.json())
      .then(data => setCategory(data))
  }, [categories])

  return (
    <div>
      <div style={{ backgroundImage: "url(/b.jpeg)" }} className='h-screen bg-cover italic'>
        <div className='h-full w-full bg-gray-900 bg-opacity-50 flex justify-center items-center'>

          <div className='w-1/2'>
            <p className='font bold md:text-4xl text-2xl text-white'>Welcome to...</p>
            <p className='font bold md:text-7xl text-4xl text-white mt-4'>
              <span className='text-pink-500'>S</span>hopping <span className='text-pink-500'>W</span>orld</p>

            <p className='font bold text-2xl text-white mt-4 hidden md:block'> Biker’s Warehouse is one of Johannesburg’s top bike and accessory brand suppliers. Our brands are carefully selected to offer the widest product range to cater for the needs of any road, dual-sport or off-road enthusiast. </p>
          </div>
        </div>
      </div>

      <h1 className='font-bold text-3xl text-center mt-10'>Brows by category</h1>

      {categories?.map((category, index) => <div className='mt-10' key={index}>
        <h2 className='font-bold text-xl mb-4 sm:text-left text-center px-4'>{category.categoryName}</h2>
        <div className='grid sm:grid-cols-6 grid-cols-2 place-items-center gap-3 px-3'>
          {category.categories.map((ctg, index) => <div key={index} className=' w-full sm:h-64 h-44 border-[1px] border-pink-900 rounded-lg overflow-hidden '>
            <Link to={`/subCategory/${ctg.name}`} className=''>
              <img className='w-full sm:h-44 h-32 border-b-[1px] border-pink-900' src={ctg.categoryImg} alt="" />
              <div className='flex justify-center sm:h-20 h-10 items-center text-pink-700'>
                <p>{ctg.name}</p>
              </div>
            </Link>
          </div>)}
        </div>
      </div>
      )}




    </div>
  )
}

export default Home