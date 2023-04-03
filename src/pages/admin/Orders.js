import React from 'react'
import { useQuery } from 'react-query'
import { toast } from 'react-toastify'


const Orders = () => {


  const { data: orderedVouchers, isLoading, refetch } = useQuery('orderedVouchers', () => fetch('https://mohid-shop.onrender.com/orderedVoucherForAdmin', {
    method: 'GET',
    headers: {
      'authorization': `Bearer ${localStorage.getItem('accessToken')}`
    },
  }).then(res => res.json()))

  const deleteVoucher = id => {

    fetch(`https://mohid-shop.onrender.com/orderedVoucherForAdmin/${id}`, {
      method: 'DELETE',
    }).then(res => res.json())
      .then(data => {
        if (data.deletedCount > 0) {
          toast.success('Voucher deleted from collections')
          refetch()
        } else {
          toast.error('Do not deleted')
        }
      })

  }

console.log(orderedVouchers)

  if (isLoading) {
    return <div className='min-h-[600px]'><p>Loading...</p></div>
  }
  return (
    <div className='min-h-[600px]'>
      <div className='px-4'>
        {orderedVouchers?.map(px => <div key={px._id} className='mb-10 p-4 pb-2  border-2 rounded-md border-pink-500'>
        <p className='font-bold'>Date :{px.date}/{px.month}/{px.year}</p>
          <div className='sm:flex justify-between'>
            <div className='sm:w-5/12'>
              <p className=''><span className='font-bold mr-2'>Customer's Name:</span>{px.name}</p>
              <p className=''><span className='font-bold mr-2'>Send Money from:</span>{px.bkashNumber}</p>
              <p className=''><span className='font-bold mr-2'>TrxID:</span>{px.trxID}</p>
              <p className=''><span className='font-bold mr-2'>Payed amount:</span>{px.amount}</p>
              <p className=''><span className='font-bold mr-2'>Total Price:</span>{px.totalRequiredPrice}</p>
              <p className=''><span className='font-bold mr-2'>Address:</span>{px.address} , {px.city}</p>

            </div>
            <div className='sm:w-7/12 sm:border-l-[1px] sm:pl-8  border-pink-500'>
              <div className=' border-b-[1px] border-black '>
                <p className='font-bold'>Order Summary</p>
                <div className='flex justify-between border-b-[1px] border-black mb-1'>
                  <p className='text-center w-20 font-bold'>Img</p>
                  <p className='text-center w-20 font-bold'>Name</p>

                  <p className='text-center w-20 font-bold'>Qnt*Prc</p>

                  <p className='text-center w-20 font-bold'>Price</p>

                </div>
                {px.orderedProduct?.map(p => <div className='flex justify-between mb-1' key={p._id}>
                 <div className='w-20 flex justify-center '>
                 <img src={p.img} className='w-8 h-8' alt="" />
                 </div>
                  <p  className='text-center w-20'>{p.name}</p>
                  <p  className='text-center w-20'>{p.quantity}x{p.price}</p>
                  <p  className='text-center w-20'>${p.quantity * p.price}</p>
                </div>)}
              </div>
              <div className='flex justify-between'>
                <p className='text-center w-20 '>Total</p>
                <p className='text-center w-20 '>${px.onlyProductsPriceTotal}</p>

              </div>
              <div className='flex justify-between border-b-[1px] border-black'>
                <p className='text-center w-20 '>Shipping</p>
                <p className='text-center w-20 '>${px.shippingCharge}</p>

              </div>
              <div className='flex justify-between font-bold'>
                <p className='text-center w-20 '>Total</p>
                <p className='text-center w-20 '>${px.totalRequiredPrice}</p>

              </div>
            </div>
          </div>
          <div className='   w-full flex justify-end mt-3'>
            <button className='   bg-red-700 px-3 py-1 rounded-md text-white font-bold' onClick={() => deleteVoucher(px._id)}>Delete</button>

          </div>
        </div>)}

      </div>

    </div>
  )
}

export default Orders