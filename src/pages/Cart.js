import React from 'react'



const Cart = () => {


  return (

    <div className='min-h-[600px]'>
      <h1 className='text-center font-bold text-3xl mt-10'>Cart</h1>

      <div className='sm:flex mt-10 px-2'>
        <table className='sm:w-1/2'>
          <thead className='border-[1px] border-pink-700'>
            <tr>
              <th className='w-24 text-center'>Img</th>
              <th className='w-24 text-center'>Name</th>
              <th className='w-24 text-center'>Price</th>
              <th className='w-24 text-center'>Quantity</th>
              <th className='w-24 text-center'>Delete</th>
            </tr>
          </thead>
        
        </table>
    
      </div>

    </div>



  )
}

export default Cart