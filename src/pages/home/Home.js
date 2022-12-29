
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
    <div className='min-h-[600px]'>
      <img src="b.jpeg" className='w-full h-screen' alt="" />
      <h1 className='font-bold text-3xl text-center mt-10'>Brows by category</h1>

      {categories?.map((category,index) => <div className='mt-10' key={index}>
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